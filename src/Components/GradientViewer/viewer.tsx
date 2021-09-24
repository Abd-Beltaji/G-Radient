import "./viewer.css";
const GradientViewer = ({ gradientCode }: { gradientCode: string }) => {
  return (
    <div
      id="gradeintViewer"
      style={{
        background: gradientCode,
      }}
    ></div>
  );
};
export default GradientViewer;
