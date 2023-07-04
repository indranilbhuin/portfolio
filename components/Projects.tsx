import React from "react";
import gsap from "gsap";
import { CSSProperties, useEffect, useRef } from "react";
import useShapes from "../components/Float/useShapes";
import { SectionLayout } from "./Layout";
import Float from "./Float/Float";
import { projects } from "./Float/config";

export const data = [
  {
    image: "image-url-1",
    title: "Project 1",
    description: "This is the description for Project 1.",
    link: "https://example.com/project1",
    linkText: "Learn More"
  },
  {
    image: "image-url-2",
    title: "Project 2",
    description: "This is the description for Project 2.",
    link: "https://example.com/project2",
    linkText: "Learn More"
  },
  {
    image: "image-url-3",
    title: "Project 3",
    description: "This is the description for Project 3.",
    link: "https://example.com/project3",
    linkText: "Learn More"
  },
  {
    image: "image-url-4",
    title: "Project 4",
    description: "This is the description for Project 4.",
    link: "https://example.com/project4",
    linkText: "Learn More"
  },
  {
    image: "image-url-5",
    title: "Project 5",
    description: "This is the description for Project 5.",
    link: "https://example.com/project5",
    linkText: "Learn More"
  },
  {
    image: "image-url-6",
    title: "Project 6",
    description: "This is the description for Project 6.",
    link: "https://example.com/project6",
    linkText: "Learn More"
  }
];


export default function Writing() {
  const ref = useRef<HTMLDivElement>(null);
  const items = useShapes({ config: [] }); // Pass an empty config for now since it's not used

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".shape",
        { display: "none", scale: 0 },
        {
          display: "block",
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const container = ref.current;

    if (!container) {
      return;
    }

    const ctx = gsap.context(() => {
      const shapes = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll(".shape")
      );

      shapes.forEach((shape, i) => {
        const depth = 60;
        const moveX = (e.pageX - window.innerWidth / 2) / depth;
        const moveY = (e.pageY - window.innerHeight / 2) / depth;
        i++;

        let lag = shape.dataset.lag ?? `${i}`;

        gsap.to(shape, {
          x: moveX * parseInt(lag, 10),
          y: moveY * parseInt(lag, 10),
        });
      });
    }, ref);

    return () => ctx.revert();
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <SectionLayout className="w-full items-start">
      <Float config={projects} />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 card-container"
            >
              <div className="card-overlay absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="card-content">
                <h2 className="text-xl font-bold mt-2">{project.title}</h2>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <a href={project.link} className="text-blue-500 underline mt-2">
                  {project.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={ref} className="-z-10 overflow-hidden opacity-80 dark:opacity-50">
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="shape absolute hidden"
            style={{ ...(item as CSSProperties) }}
            data-lag={item.lag}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}

