import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// create express app
const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware)

const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware)

const PORT = process.env.PORT || 3000

let videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World :)')
})

app.get('/videos', (req: Request, res: Response) => {
  res.send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
  try {
    console.log("app.post('/videos'")
    res.status(400)
    res.send({id: 111, title: 'create title', author: 'create author'})
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

app.get('/videos/:videoId', (req: Request, res: Response) => {
  try {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id)
    if (video !== undefined) {
      res.send(video)
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

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`)
})