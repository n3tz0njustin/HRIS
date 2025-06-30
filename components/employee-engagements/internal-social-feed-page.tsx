"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquareIcon, ThumbsUpIcon, Share2Icon } from "lucide-react"

interface Post {
  id: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

const initialPosts: Post[] = [
  {
    id: "1",
    author: "Alice Smith",
    authorAvatar: "/placeholder-user.jpg",
    content:
      "Had a fantastic team-building event today! So much fun getting to know everyone better outside of work. #TeamBuilding #CompanyCulture",
    timestamp: "2 hours ago",
    likes: 15,
    comments: 3,
  },
  {
    id: "2",
    author: "Bob Johnson",
    authorAvatar: "/placeholder-user.jpg",
    content:
      "Excited to announce the successful launch of Project Phoenix! Huge thanks to everyone involved for their hard work and dedication. #ProjectSuccess #Innovation",
    timestamp: "Yesterday",
    likes: 28,
    comments: 7,
  },
  {
    id: "3",
    author: "Charlie Brown",
    authorAvatar: "/placeholder-user.jpg",
    content:
      "Looking for volunteers for our upcoming community outreach program next month. Let's make a difference together! DM me if interested. #CSR #CommunityService",
    timestamp: "3 days ago",
    likes: 10,
    comments: 2,
  },
]

interface InternalSocialFeedPageProps {
  onBack: () => void
}

export default function InternalSocialFeedPage({ onBack }: InternalSocialFeedPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPostContent, setNewPostContent] = useState("")

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newId = (posts.length + 1).toString()
      const newPost: Post = {
        id: newId,
        author: "You", // Simulate current user
        authorAvatar: "/placeholder-user.jpg", // Placeholder for user's avatar
        content: newPostContent.trim(),
        timestamp: "Just now",
        likes: 0,
        comments: 0,
      }
      setPosts((prev) => [newPost, ...prev]) // Add new post to the top
      setNewPostContent("")
    }
  }

  const handleLike = (id: string) => {
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleComment = (id: string) => {
    alert(`Commenting on post ${id}... (Functionality not implemented)`)
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, comments: post.comments + 1 } : post)))
  }

  const handleShare = (id: string) => {
    alert(`Sharing post ${id}... (Functionality not implemented)`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Internal Social Feed</h2>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Your Avatar" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 grid gap-2">
              <Textarea
                placeholder="Share something with your colleagues..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={3}
              />
              <Button onClick={handleCreatePost} className="self-end">
                Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                </div>
              </div>
              <p className="mb-4 text-base">{post.content}</p>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                  <ThumbsUpIcon className="h-4 w-4 mr-1" /> {post.likes} Likes
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleComment(post.id)}>
                  <MessageSquareIcon className="h-4 w-4 mr-1" /> {post.comments} Comments
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare(post.id)}>
                  <Share2Icon className="h-4 w-4 mr-1" /> Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">No posts yet. Be the first to share something!</p>
      )}
    </div>
  )
}
