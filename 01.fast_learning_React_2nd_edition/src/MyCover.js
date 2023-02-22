export default function MyCover(props) {
    const url = 'https://wings.msn.to/books/' + props.isbn + '/' + props.isbn + '.jpg';
    return (
        <img src={url} alt={props.title} />
    );
}
