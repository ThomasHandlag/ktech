import { DiGithub } from "react-icons/di";

const Welcome = () => {
  return (
    <div className="items-center justify-center flex flex-col h-screen p-4">
      <h1 className="text-4xl font-bold">Welcome to ktech practices and homework collection</h1>
      <p>
        This is a collection of UI components and pages for practice and
        demonstration purposes.
      </p>
      <p>
        Use the navigation to explore my homework and practices components and their
        functionalities.
      </p>
      <img src="https://www.bing.com/th/id/OGC.2fc0a80a5b64139db4baa8cd9c1b76f8?o=7&pid=1.7&rm=3&rurl=https%3a%2f%2fmedia.tenor.com%2f4Lbd0PCVol0AAAAC%2fspider-man-no-way-home-tobey-maguire.gif&ehk=LNyI2GsykB6hy%2fMffp4ub8vgfcLY3UkjhwAl0AQbQXs%3d" />
        <a href="https://github.com/ThomasHandlag/ktech" className="flex items-center">Give me a ⭐ at <DiGithub size={40}/></a>
    </div>
  );
};

export default Welcome;
