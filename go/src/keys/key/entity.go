package key

// Key data
type Key struct {
	ID  string `json:"id" bson:"_id,omitempty"`
	Key string `json:"key" bson:"key"`
}
