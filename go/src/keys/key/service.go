package key

//Service service interface
type Service struct {
	repo Repository
}

//NewService create new service
func NewService(r Repository) *Service {
	return &Service{
		repo: r,
	}
}

//Store an bookmark
func (s *Service) Generate() (interface{}, error) {
	return s.repo.Create()
}
