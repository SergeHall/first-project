import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware)

const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware)

const PORT = process.env.PORT || 3000

const videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu1', rating: 98},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu2', rating: 70},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu3', rating: 60},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu4', rating: 45},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu53', rating: 15},
]
const posts = [
  {id: 1, title: "Dimych", content: "some content1"},
  {id: 2, title: "Max", content: "some content2"},
  {id: 3, title: "Dimych", content: "some content3"},
  {id: 4, title: "Vika", content: "some content4"},
  {id: 5, title: "Musk", content: "some content5"},
  {id: 6, title: "Kolyan", content: "some content6"}
]

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World :)')
})

app.get('/videos', (req: Request, res: Response) => {
  try {
    const searchRating = req.query.rating;
    if (searchRating) {
      res.send(videos.filter(v => v.rating >= +searchRating))
      res.status(400)
    } else {
      res.send(videos)
    }
  } catch (error) {
    return res.status(500)
  }
})

app.get('/posts', (req: Request, res: Response) => {
  try {
    if (req.query.title) {
      const searchTitle = req.query.title.toString();
      const matched = posts.filter(v => v.title.indexOf(searchTitle) > -1);
      if (matched.length <= 0) {
        res.status(404)
        res.send(posts)
      }
      res.send(matched)
    } else {
      res.send(posts)
    }
  } catch (error) {
    return res.status(500)
  }
})

app.post('/posts', (req: Request, res: Response) => {
  try {
    if (req.body.title !== "" && req.body.content !== "") {
      const newPost = {
        id: +(new Date()),
        title: req.body.title,
        content: req.body.content
      }
      posts.push(newPost)

      res.status(201)
      res.send(newPost)
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    return res.status(500)
  }
})

app.put('/videos/:videoId', (req: Request, res: Response) => {
  try {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === +id)

    if (video) {
      video.title = req.body.title
      res.send(video)
    } else if (!Number(id)) {
      res.status(400)
    } else if (!video) {
      res.status(404)
    }
  } catch (error) {
    return res.status(500)
  }
})

app.put('/posts/:postId', (req: Request, res: Response) => {
  try {
    const id = +req.params.postId;
    const updatedPost = posts.find(v => v.id === id)

    if (updatedPost !== undefined) {
      updatedPost.title = req.body.title
      updatedPost.content = req.body.content
      res.send(updatedPost)
    } else if (isNaN(id)) {
      res.sendStatus(400)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.status(500)
  }
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
  try {
    const video = videos.find(v => v.id === +req.params.videoId)
    if (video) {
      res.send(video)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
})

app.get('/posts/:postId', (req: Request, res: Response) => {
  try {
    const post = posts.find(v => v.id === +req.params.postId)
    if (post) {
      res.send(post)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    return res.sendStatus(500)
  }
})

app.delete('/videos/:videoId', (req: Request, res: Response) => {
  const id = +req.params.videoId
  const newVideos = videos.filter(v => v.id === id)

  if (videos.filter(v => v.id === id) && videos.indexOf(newVideos[0]) !== -1) {
    const newV = videos.indexOf(newVideos[0]);
    videos.splice(newV, 1);
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

app.delete('/posts/:postId', (req: Request, res: Response) => {
  const id = +req.params.postId
  const newPost = posts.filter(v => v.id === id)
  if (newPost[0] !== undefined) {
    const newV = posts.indexOf(newPost[0]);
    posts.splice(newV, 1);
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})