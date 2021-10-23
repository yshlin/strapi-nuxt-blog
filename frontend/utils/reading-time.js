const WPM = {
  default: 200,
};

export function getReadingTime(content) {
  return (
    1 +
    Math.round(
      content.trim().split(/([\u00ff-\uffff]|\S+)/).length / WPM.default
    )
  );
}
