package key

//Repository repository interface
type Repository interface {
	Create() (interface{}, error)
}
