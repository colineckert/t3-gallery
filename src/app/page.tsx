import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/6eb3f7af-745b-4a4b-8af7-19f4fdc79af0-qqs3q9.png",
  "https://utfs.io/f/da364a79-0be7-4c69-aaf3-01a72b1e8ca2-a1bv4c.png",
  "https://utfs.io/f/7f8ed025-05a3-4947-beb7-24db1b457f1a-reaogw.png",
  "https://utfs.io/f/6a7d31c9-35ec-41a3-87ec-7d5734fed94a-9bzy8e.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log("***", posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            {post.name}
          </div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
