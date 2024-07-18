import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Intro.css"; // Updated import path
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import useModal from "../components/useModal";

const Intro = () => {
  // Step 2: Define the array of predefined words
  const diseases = ["Инсульт", "Дизартрия"];
  const navigate = useNavigate();
  const modalDataCorrect = useModal();
  // Step 4: Create state variables to keep track of the selected options
  const [selectedDisease, setSelectedDisease] = useState(diseases[0]);
  const [testValue, setTestValue] = useState("a");
  const [login, setLogin] = useState("");
  // Retrieve saved values from local storage when the component mounts
  useEffect(() => {
    const savedDisease = localStorage.getItem("selectedDisease");
    const savedTestValue = localStorage.getItem("testValue");
    const savedLogin = localStorage.getItem("login");
    if (savedDisease) {
      setSelectedDisease(savedDisease);
    }
    if (savedTestValue) {
      setTestValue(savedTestValue);
    }
    if (savedLogin) {
      setLogin(savedLogin);
    }
  }, []);

  // Save selected values to local storage
  const handleSave = () => {
    localStorage.setItem("selectedDisease", selectedDisease);
    localStorage.setItem("testValue", testValue);
    console.log(
      `Selected disease is: ${selectedDisease}`
    );
  };

  const handleNavigation = () => {
    navigate("/recording");
    // modalDataCorrect.showModal();
  };
  const handleModalShow = () => {
    modalDataCorrect.showModal();
  }
  
  return (
    <div className="introPage">
      <h1>Добро пожаловать, {login}!</h1>
      <Dropdown
        label="Ваша болезнь:"
        options={diseases}
        value={selectedDisease}
        onChange={setSelectedDisease}
      />
      {/* <Dropdown
        label="test"
        options={["a", "b", "c"]}
        value={testValue}
        onChange={setTestValue}
      /> */}
      <div className="btns">
        <button className="button" onClick={handleSave}>
          Сохранить
        </button>
        <button className="button" onClick={modalDataCorrect.showModal}>
          Далее
        </button>
      </div>
      {modalDataCorrect.isModalVisible && (
        <Modal
          message="Вы уверены что указали правильные данные?"
          onClose={modalDataCorrect.hideModal}
          onConfirm={handleNavigation}
          confirmText="Да"
          cancelText="Отмена"
        />
      )}
    </div>
  );
};

export default Intro;
