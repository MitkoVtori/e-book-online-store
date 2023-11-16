



export default function BookCard({
    author,
    country,
    imageLink,
    language,
    pages,
    title,
    year,
}) {

    return(


        <article>

            <p> <strong> {title} </strong> </p>

            <p> {author} </p>

            <img src={imageLink} alt="r" />


        </article>
    )
}