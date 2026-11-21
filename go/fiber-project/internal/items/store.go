package items

import (
	"sort"
	"strings"
	"sync"
)

type Item struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Store struct {
	mu     sync.Mutex
	items  map[int]Item
	nextID int
}

func NewStore() *Store {
	return &Store{items: make(map[int]Item), nextID: 1}
}

func (s *Store) List() []Item {
	s.mu.Lock()
	defer s.mu.Unlock()
	result := make([]Item, 0, len(s.items))
	for _, item := range s.items {
		result = append(result, item)
	}
	sort.Slice(result, func(i, j int) bool { return result[i].ID < result[j].ID })
	return result
}

func (s *Store) Get(id int) (Item, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	item, ok := s.items[id]
	return item, ok
}

func (s *Store) Create(name string) Item {
	s.mu.Lock()
	defer s.mu.Unlock()
	item := Item{ID: s.nextID, Name: strings.TrimSpace(name)}
	s.items[item.ID] = item
	s.nextID++
	return item
}

func (s *Store) Update(id int, name string) (Item, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	item, ok := s.items[id]
	if !ok {
		return Item{}, false
	}
	item.Name = strings.TrimSpace(name)
	s.items[id] = item
	return item, true
}

func (s *Store) Delete(id int) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	_, ok := s.items[id]
	delete(s.items, id)
	return ok
}
