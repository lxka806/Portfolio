import { useWebsite } from "../context/websites.context.jsx";

function Projects() {
    const { websites } = useWebsite();

    return (
        <>
            <h1>Projects</h1>
            <hr />

            {websites?.map((website) => (
                <div key={website._id}>
                    <img
                        src={website.image}
                        alt={website.name}
                        width="300"
                    />

                    <h2>{website.name}</h2>

                    <p>{website.description}</p>

                    <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live View
                    </a>
                </div>
            ))}
        </>
    );
}

export default Projects;