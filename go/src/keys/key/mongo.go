package key

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

type repo struct {
	client *mongo.Client
}

//NewMongoRepository create new repository
func NewMongoRepository(c *mongo.Client) Repository {
	return &repo{
		client: c,
	}
}

func (r *repo) Create() (interface{}, error) {
	newKey := Key{Key: "abcdef"}

	coll := r.client.Database("test_key").Collection("key")

	insertResult, err := coll.InsertOne(context.TODO(), newKey)

	if err != nil {
		return nil, err
	}

	return insertResult.InsertedID, err
}
