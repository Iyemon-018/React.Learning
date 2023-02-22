import MyCover from './MyCover';

export default function MyBook(props) {
    return (
        <div>
            <MyCover isbn={props.info.isbn}
                     title={props.info.title} />
            <ul>
                <li>署名: {props.info.title}</li>
                <li>価格: {props.info.price}円</li>
                <li>出版社: {props.info.published}</li>
            </ul>
        </div>
    );
}