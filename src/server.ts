import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query']
});

app.post('/user', async(req, res) => {

  const body = req.body;
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
    }
  });

  return res.status(201).json(newUser);

});

// app.get('/user', async(req, res) => {
//   const user = await prisma.user.findMany({
//     include: {
//       _count: {
//         select: {
//           posts: true,
//         },
//       },
//     },
//   });

//   return res.json(user);
// });

app.get('/user', async(req, res) => {
  const user = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  return res.json(user);
});

app.get('/user/:userId', async(req, res) => {
  const userId = req.params.userId;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  return res.status(201).json(user);
});

app.post('/post', async(req, res) => {

  const body = req.body;
  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: body.authorId,
    }
  });

  return res.status(201).json(newPost);

});

app.listen(3333, () => console.log('server is running'));
