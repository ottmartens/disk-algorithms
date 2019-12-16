const parseTimelineString = (timelineString, setError) => {
  try {
    setError('');

    const processData = timelineString.split(',');

    processData.forEach(value => {
      if (value === '' || isNaN(Number(value)) || Number(value) > 49) {
        throw new Error();
      }
    });

    return processData;
  } catch (err) {
    setError('Invalid rotation pattern!');
  }
};

export default parseTimelineString;
