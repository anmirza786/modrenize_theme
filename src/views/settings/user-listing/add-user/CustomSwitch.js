import "./styles.css";

const CustomSwitch = ({ active, setActive }) => {
  return (
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input
          type="checkbox"
          name="active"
          id="active"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
          }}
        />
        <label
          htmlFor="active"
          data-on="Active"
          data-off="Inactive"
          className="btn-color-mode-switch-inner"
        ></label>
      </label>
    </div>
  );
};

export default CustomSwitch;
