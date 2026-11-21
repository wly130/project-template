package items

import (
	"fmt"
	"sort"
	"strings"
	"sync"
)

type Item struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Service struct {
	mu     sync.Mutex
	items  map[int]Item
	nextID int
}

func NewService() *Service {
	return &Service{items: make(map[int]Item), nextID: 1}
}

func (s *Service) List() []Item {
	s.mu.Lock()
	defer s.mu.Unlock()
	result := make([]Item, 0, len(s.items))
	for _, item := range s.items {
		result = append(result, item)
	}
	sort.Slice(result, func(i, j int) bool { return result[i].ID < result[j].ID })
	return result
}

func (s *Service) Get(id int) (Item, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	item, ok := s.items[id]
	if !ok {
		return Item{}, fmt.Errorf("item %d not found", id)
	}
	return item, nil
}

func (s *Service) Create(name string) (Item, error) {
	if strings.TrimSpace(name) == "" {
		return Item{}, fmt.Errorf("name is required")
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	item := Item{ID: s.nextID, Name: strings.TrimSpace(name)}
	s.items[item.ID] = item
	s.nextID++
	return item, nil
}

func (s *Service) Update(id int, name string) (Item, error) {
	if strings.TrimSpace(name) == "" {
		return Item{}, fmt.Errorf("name is required")
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	item, ok := s.items[id]
	if !ok {
		return Item{}, fmt.Errorf("item %d not found", id)
	}
	item.Name = strings.TrimSpace(name)
	s.items[id] = item
	return item, nil
}

func (s *Service) Delete(id int) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	_, ok := s.items[id]
	delete(s.items, id)
	if !ok {
		return fmt.Errorf("item %d not found", id)
	}
	return nil
}
