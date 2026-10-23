import ButtonColorChange from './ButtonColorChange';
import ColorChangeInput from './ColorChangeInput';
import Counter from './Counter';

function GetStartedContainer() {
  return (
    <div className="section-container">
      <div className="section-header">
        <h2>A. Get Start with React</h2>
        <p className="section-desc">
          แบบฝึกหัดพื้นฐานการใช้งาน State, Props, Event Handlers และ Data Binding ตามสไลด์หน้า 50-60
        </p>
      </div>
      <div className="cards-grid">
        <ButtonColorChange />
        <ColorChangeInput />
        <Counter />
      </div>
    </div>
  );
}

export default GetStartedContainer;
