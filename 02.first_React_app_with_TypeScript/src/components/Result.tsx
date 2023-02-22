
type ResultPropsType = {
    results: {
        country: string;
        cityName: string;
        tempurature: string;
        condition: string;
        icon: string;
    };
};

const Result = (props: ResultPropsType) => {
    return (
        <div>
            {props.results.country &&
                <div>
                    <div className="results-country">{props.results.country}</div>
                    <div className="results-city">{props.results.cityName}</div>
                    <div className="results-temp">{props.results.tempurature}<span>℃</span></div>
                    <div className="results-condition">
                        <img src={props.results.icon} alt="icon" />
                        <div>{props.results.condition}</div>
                    </div>
                </div>}
        </div>
    );
};

export default Result;

