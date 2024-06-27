
export const getCreateBody = () => {
  return {
    "id": Date.now(),
    "category": {
      "id": 1,
      "name": "gato"
    },
    "name": "piti",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 1,
        "name": "verde"
      }
    ],
    "status": "available"
  }
}

export const getUpdateBody = (id) => {
  return {
    "id": id,
    "category": {
      "id": 2,
      "name": "cachorro"
    },
    "name": "cachorrinho"
  }
}
