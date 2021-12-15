const axios = require('axios');

const step1 = (req, res) => {
  res.status(200).send({
    success: 'true',
  })
}

const getTags = (req, res) => {
  const { tags, sortBy, direction } = req.params;
  const validSortValues = ['id', 'author', 'authorId', 'likes', 'popularity', 'reads', 'tags', undefined];
  const validDirections = ['asc', 'desc', undefined];

  if (validSortValues.indexOf(sortBy) === - 1) {
    res.status(400).send({
      error: 'sortBy parameter is invalid',
    });
  }
  if (validDirections.indexOf(direction) === -1) {
    res.status(400).send({
      error: 'sortBy parameter is invalid',
    });
  }

  if (tags.indexOf(',') !== - 1) {
    let tagArray = tags.split(',');
    let getPaths = tagArray.map((tag, i) => {
      return axios.get(`http://=${tag}&sortBy=${sortBy}&direction=${direction}`)
    });
    axios.all([
      ...getPaths
    ])
      .then(axios.spread((tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9) => {
        let data = [
          tag1 ? tag1.data.posts : '',
          tag2 ? tag2.data.posts : '',
          tag3 ? tag3.data.posts : '',
          tag4 ? tag4.data.posts : '',
          tag5 ? tag5.data.posts : '',
          tag6 ? tag6.data.posts : '',
          tag7 ? tag7.data.posts : '',
          tag8 ? tag8.data.posts : '',
          tag9 ? tag9.data.posts : ''
        ]
        let post = {};
        let posts = [];
        for (let i = 0; i < data.length; i++) {
          let blog = data[i];
          for (let i = 0; i < blog.length; i++) {
            post[blog[i].id] = blog[i];
          }
        }
        for (let key in post) {
          posts.push(post[key]);
        }
        if (sortBy) {
          if (direction === 'desc') {
            posts = posts.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
          } else {
            posts = posts.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
          }
        }
        res.status(200).send(posts);
      }))
      .catch(error => {
        res.status(400).send({
          error: 'Tags parameter is required',
        })
        console.log(error)
      });
  } else {
    axios.get(`http://?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
      .then(request => {
        let data = request.data.posts;
        if (sortBy) {
          if (direction === 'desc') {
            data = data.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
          } else {
            data = data.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
          }
        }
        res.status(200).send(data);
      })
      .catch(error => {
        res.status(400).send({
          error: 'Tags parameter is required',
        })
        console.log(error)
      });
  }
}

module.exports = {
  step1,
  getTags
}