import { ChangeEvent, FormEvent, useState } from "react";

type FormPropsType = {
    onGetWeather: (city: string) => void;
}

const Form = (props: FormPropsType) => {
    const [city, setCity] = useState<string>("");
    const { onGetWeather } = props;

    function handleCityChange(e: ChangeEvent<HTMLInputElement>): void {
        setCity(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        onGetWeather(city);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="city" placeholder="都市名" onChange={(e) => handleCityChange(e)} />
            {city}
            <button type="submit" >Get Weather</button>
        </form>
    );
};

export default Form;