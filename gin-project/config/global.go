package config

import "log"

type Response[T any] struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
	Data T      `json:"data"`
}

type ListInfo[T any] struct {
	Total int64 `json:"total"`
	Rows  T     `json:"rows"`
}

func Success[T any](msg string, data T) Response[T] {
	return Response[T]{Code: 200, Msg: msg, Data: data}
}

func CheckError(code int, err error, msg string) (Response[any], error) {
	if err != nil {
		log.Printf(msg, err)
		return Response[any]{Code: code, Msg: msg, Data: nil}, err
	}
	return Response[any]{}, nil
}
