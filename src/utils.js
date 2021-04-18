function mapDate({
  t, mu, sigma, fee, initialSum, monthlySum,
}) {
  const yearlyReturn = mu - fee;
  const monthlyReturn = yearlyReturn / 12;
  const month = t * 12;

  const median = initialSum * Math.exp(yearlyReturn * t) + monthlySum * Math.exp(monthlyReturn
    * (month - Math.floor(month)))
    * (Math.exp(monthlyReturn * Math.floor(month)) - 1.0) / (Math.exp(monthlyReturn) - 1.0); // eslint-disable-line no-mixed-operators

  return {
    median,
    upper95: Math.exp(Math.log(median) + Math.sqrt(t) * sigma * 1.645),
    lower05: Math.exp(Math.log(median) - Math.sqrt(t) * sigma * 1.645),
  };
}

const calculateTimeSeries = ({
  years, mu, sigma, fee, initialSum, monthlySum,
}) => {
  const series = [];

  for (let i = 0; i <= 12 * years; i += 1) {
    series.push(mapDate({
      t: i / 12, mu, sigma, fee, initialSum, monthlySum,
    }));
  }

  const allSeries = {
    median: [],
    upper95: [],
    lower05: [],
  };

  for (let j = 0; j < series.length; j += 1) {
    allSeries.median.push({ y: series[j].median, x: series[j].x });
    allSeries.upper95.push({ y: series[j].upper95, x: series[j].x });
    allSeries.lower05.push({ y: series[j].lower05, x: series[j].x });
  }

  return allSeries;
};

/**
 * Fetches data from api
 * Works only with GET and supports JSON responses.
 * Some more abstract and powerful implementation should be used here for handling all API calls
 * @param url <String> api url where to fetch data
 * @param headersObj Object which headers should be applied to api call
 * @returns Promise someJsonParsedData
 */
const apiGet = (url, headersObj) => {
  const headers = headersObj && new Headers(headersObj);

  return fetch(url, { headers })
    .then((response) => response.json())
    .then((data) => data);
};

/**
 * Builds array of supported risks levels fetched from API
 * @param data Array response from API
 * @returns risksLevelArr <Number>[]
 */
const buildSupportedRiskLevelsArr = (data) => {
  if (!data) {
    return null;
  }

  // Could add additional logic to limit array with max and min risk values. But not sure if it is really needed...
  return data.reduce((acc, item) => {
    acc.push(item.riskLevel);

    return acc;
  }, []);
};

export { calculateTimeSeries, apiGet, buildSupportedRiskLevelsArr };
