"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
	const pathname = usePathname();

	const linkClasses = (path: string) =>
		pathname === path
			? "text-white font-bold"
			: "text-gray-300 font-light hover:text-white";

	return (
		<nav className="bg-violet-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg font-bold">
					<Link href="/">Home</Link>
				</div>

				<div className="space-x-4">
					<Link
						href="/about"
						className={linkClasses("/about")}
					>
						About
					</Link>

					<Link
						href="/todo-list"
						className={linkClasses("/todo-list")}
					>
						Todo List
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
