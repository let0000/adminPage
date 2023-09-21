import React, { useEffect, useState } from "react";
import "./questioncontent.css";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function QuestionContent() {
  const [questionData, setQuestionData] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");

  const [editedUID, setEditedUID] = useState("");
  const [editedQuestionDate, setEditedQuestionDate] = useState("");
  const [editedQuestionUid, setEditedQuestionUid] = useState("");
  const [editedQuestionUserName, setEditedQuestionUserName] = useState("");
  const [editedQuestionTitle, setEditedQuestionTitle] = useState("");
  const [editedQuestionDiscription, setEditedQuestionDiscription] =
    useState("");
  const [editedAnwser, setEditedAnwser] = useState("");
  const [editedAnwserDate, setEditedAnwserDate] = useState("");

  useEffect(() => {
    axios
      .get(`/api/questions/list?status=${selectedStatus}`)
      .then((response) => {
        if (response.data.success) {
          setQuestionData(response.data.questions);
        } else {
          console.log("데이터를 가져오지 못했습니다.");
        }
      })
      .catch((err) => {
        console.error("오류가 발생했습니다", err);
      });
  }, [selectedStatus]);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);

    setEditedUID(question._id);
    setEditedQuestionDate(question.questionDate);
    setEditedQuestionUid(question.questionUid);
    setEditedQuestionUserName(question.questionUserName);
    setEditedQuestionTitle(question.questionTitle);
    setEditedQuestionDiscription(question.questionDiscription);
    setEditedAnwser(question.anwser ? question.anwser : "");
    setEditedAnwserDate(question.anwserDate ? question.anwserDate : "");
  };

  const handleUpdateClick = () => {
    const padZero = (value) => {
      return value < 10 ? `0${value}` : value;
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = padZero(currentDate.getMonth() + 1);
    const day = padZero(currentDate.getDate());
    const hours = padZero(currentDate.getHours());
    const minutes = padZero(currentDate.getMinutes());

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    const updatedData = {
      id: editedUID,
      anwser: editedAnwser,
      anwserDate: formattedDate,
    };

    axios
      .post("/api/questions/update", updatedData)
      .then((response) => {
        if (response.data.success) {
          // 업데이트 성공 시 사용자 정보 다시 불러오기
          axios.get("/api/questions/list").then((response) => {
            if (response.data.success) {
              setQuestionData(response.data.questions);
              setSelectedQuestion(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedQuestionDate("");
              setEditedQuestionUid("");
              setEditedQuestionUserName("");
              setEditedQuestionTitle("");
              setEditedQuestionDiscription("");
              setEditedAnwser("");
              setEditedAnwserDate("");

              toast.success("수정이 완료되었습니다.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
              });
            } else {
              console.log("데이터를 가져오지 못했습니다.");

              toast.error("데이터를 가져오지 못했습니다.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
              });
            }
          });
        } else {
          console.log("사용자 정보 업데이트 실패");

          toast.error("수정에 실패하였습니다.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        console.error("오류가 발생했습니다", err);
      });
  };

  const handleCloseClick = () => {
    setSelectedQuestion(null);

    setEditedUID("");
    setEditedQuestionDate("");
    setEditedQuestionUid("");
    setEditedQuestionUserName("");
    setEditedQuestionTitle("");
    setEditedQuestionDiscription("");
    setEditedAnwser("");
    setEditedAnwserDate("");
  };

  return (
    <div className="questionContent">
      <div className="questionList">
        <div className="questionSearch">
          <div className="searchTitle">
            <span>선택</span>
          </div>
          <div className="searchSelect">
            <Form.Select
              size="sm"
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}
            >
              <option value="all">전체 보기</option>
              <option value="no">답변 미완료</option>
              <option value="yes">답변 완료</option>
            </Form.Select>
          </div>
        </div>
        <div className="questionTableContainer">
          <div className="questionTable">
            <div className="tableHeader">
              <Table>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead>
                  <tr className="table-info">
                    <th>질문날짜</th>
                    <th>질문자</th>
                    <th>질문제목</th>
                    <th>답변여부</th>
                  </tr>
                </thead>
              </Table>
            </div>
            <div className="tableContent">
              <Table>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <tbody>
                  {questionData.map((question) => {
                    return (
                      <tr
                        key={question._id}
                        onClick={() => {
                          handleQuestionClick(question);
                        }}
                        className={
                          selectedQuestion === question ? "table-light" : ""
                        }
                      >
                        <td>{question.questionDate}</td>
                        <td>{question.questionUserName}</td>
                        <td>{question.questionTitle}</td>
                        <td>{question.anwser ? "O" : "X"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="questionInfo">
        <div className="infoContainer">
          {selectedQuestion && (
            <div className="infoClose" onClick={handleCloseClick}>
              <CloseIcon />
            </div>
          )}
          <div className="infoFiled">
            <span className="filedName">질문 날짜</span>
            <div className="filedForm">
              <Form.Control size="sm" type="text" value={editedQuestionDate} />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">질문자</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedQuestionUserName}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">질문 제목</span>
            <div className="filedForm">
              <Form.Control size="sm" type="text" value={editedQuestionTitle} />
            </div>
          </div>
          <div className="infoFiled">
            <div className="filedForm">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="질문 내용"
                value={editedQuestionDiscription}
              />
            </div>
          </div>
          <hr />
          <div className="infoFiled">
            <div className="filedForm">
              <span> 답변 </span>
              <br />
              <br />
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="답변 달기"
                value={editedAnwser}
                onChange={(e) => setEditedAnwser(e.target.value)}
              />
            </div>
          </div>
          {editedAnwserDate && (
            <div className="infoFiled">
              <span className="filedName">답변 날짜</span>
              <div className="filedForm">
                <Form.Control size="sm" type="text" value={editedAnwserDate} />
              </div>
            </div>
          )}

          <div className="infoButton">
            {editedAnwserDate ? (
              <Button variant="info" onClick={handleUpdateClick}>
                <EditNoteIcon />
                <span>답변 수정</span>
              </Button>
            ) : (
              <Button variant="info" onClick={handleUpdateClick}>
                <PostAddIcon />
                <span>답변 등록</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionContent;
