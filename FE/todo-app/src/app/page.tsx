import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-16">
      <h1>Todo App</h1>

      <p className="pt-4 pb-4">
        Welcome to my attempt at a Todo App. Vist the{' '}
        <strong>"Todo List"</strong> page to see it in action or go to{' '}
        <strong>"About"</strong> to learn more about the project.
      </p>

      <Link href={'/about'}>
        <div className="link-button mb-4">About</div>
      </Link>

      <Link href={'/todo-list'}>
        <div className="link-button"> My Todo List</div>
      </Link>
    </main>
  );
}
