import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { TotalPopulationAggregate } from "../../types/prefecture";

type TransitionGraphProps = HighchartsReact.Props & {
    aggregates: TotalPopulationAggregate[];
}

export const TransitionGraph = (props: TransitionGraphProps) => {
    const componentRef = useRef<HighchartsReact.RefObject>(null);
    // props の総人口データが親コンポーネントから書き換えられるので useState にする必要はない。
    // props が変更されるたびに series を書き換えることでグラフが動的に変更されるようになる。
    const chartOptions = {
        chart: {
            type: "line"
        },
        xAxis: {
            categories: [] as string[],
            title: "年数",
            tickInterval: 5,
        },
        series: [
            { name: "no.1", data: [] as number[][] }
        ],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    format: '{value:,.0f}',
                },
                enableMouseTracking: true,
            }
        }
    }

    chartOptions.series = props.aggregates
        .map(aggregate => {
            return {
                name: aggregate.prefName,
                data: aggregate.perYears.map(total => [total.year, total.value]),
            }
        });

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={componentRef}
                {...props} />
        </div>
    );
}