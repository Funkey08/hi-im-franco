const books = [
  {
    name: "kafka_on_the_shore.jpg",
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
  },
  {
    name: "three_body_problem.jpg",
    title: "The Three-Body Problem",
    author: "Liu Cixin",
  },
  {
    name: "lord_of_the_rings.jpg",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    name: "dune.jpg",
    title: "Dune",
    author: "Frank Herbert",
  },
  {
    name: "exhalation.jpg",
    title: "Exhalation",
    author: "Ted Chiang",
  },
];

const booksCoversMap = import.meta.glob(
  "../assets/books/*.{png,svg,jpg,jpeg}",
  {
    eager: true,
    as: "url",
  }
);

const booksData = books.map((book) => ({
  ...book,
  src: booksCoversMap[`../assets/books/${book.name}`],
}));

const BooksGrid = () => {
  return (
    <section className="w-full pt-1 px-4 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          My favourite books...
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 justify-items-center items-start">
          {booksData.map(({ src, title, author }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-2"
            >
              <img
                src={src}
                alt={`Book cover of ${title}`}
                className="h-48 w-auto object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.07] hover:shadow-lg"
              />
              <div className="text-sm font-medium">{title}</div>
              <div className="text-xs text-white/70 italic">{author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksGrid;
