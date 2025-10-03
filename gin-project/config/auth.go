package config

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type CustomClaims struct {
	UserID int `json:"user_id"`
	jwt.RegisteredClaims
}

var (
	SECRET_KEY = []byte(os.Getenv("SECRET_KEY"))

	ErrMissingToken       = errors.New("未提供Token")
	ErrInvalidTokenFormat = errors.New("Token格式错误")
	ErrInvalidSigningAlgo = errors.New("意外Token算法")
	ErrSignatureInvalid   = errors.New("无效签名")
	ErrTokenExpired       = errors.New("Token已过期")
	ErrTokenValidation    = errors.New("Token验证失败")
	ErrInvalidClaims      = errors.New("无效的Token")
)

// 生成访问令牌
func GetAccessToken(userID int) (string, error) {
	expirationTime := time.Now().Add(15 * time.Minute)
	claims := &CustomClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(SECRET_KEY)
}

// 生成刷新令牌
func GetRefreshToken(userID int) (string, error) {
	expirationTime := time.Now().Add(7 * 24 * time.Hour)
	claims := &CustomClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(SECRET_KEY)
}

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"code": 401, "msg": ErrMissingToken.Error()})
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"code": 401, "msg": ErrInvalidTokenFormat.Error()})
			c.Abort()
			return
		}

		token, err := jwt.ParseWithClaims(parts[1], &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("%w: 期望HS256,实际 %s", ErrInvalidSigningAlgo, token.Header["alg"])
			}
			return []byte(SECRET_KEY), nil
		})
		if err != nil {
			if errors.Is(err, jwt.ErrSignatureInvalid) {
				c.JSON(http.StatusUnauthorized, gin.H{"code": 401, "msg": ErrSignatureInvalid.Error()})
				c.Abort()
				return
			}
			if errors.Is(err, jwt.ErrTokenExpired) {
				c.JSON(http.StatusUnauthorized, gin.H{"code": 401, "msg": ErrTokenExpired.Error()})
				c.Abort()
				return
			}
			c.JSON(http.StatusUnauthorized, gin.H{"code": 401, "msg": ErrTokenValidation.Error()})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(*CustomClaims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"code": 401, "msg": ErrInvalidClaims.Error()})
			c.Abort()
			return
		}
		c.Set("user", claims)
		c.Next()
	}
}
