import Image from 'next/image';

export default function About() {
  return (
    <main className="min-h-screen p-16">
      <h1>About</h1>

      <p>This is a project written using Next 14 and Tanstack Query.</p>

      <p>Tailwind css is used for styling.</p>

      <p>BE is an express rest API written in node/typescript.</p>

      <Image
        alt=""
        aria-hidden
        height="350"
        width="350"
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2NiM3BncmRjMWltNWNlcjI2bGlubWc3cDM3MzI2aWJkNHl6Y3JoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pFwRzOLfuGHok/giphy.gif"
      />
    </main>
  );
}
