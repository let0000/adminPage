import React, { useEffect, useState } from "react";
import "./eventcontent.css";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchIcon from "@mui/icons-material/Search";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CloseIcon from "@mui/icons-material/Close";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { ko } from "date-fns/esm/locale";

function EventContent() {
  const [eventData, setEventData] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState();

  const [editedUID, setEditedUID] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStartDate, setEditedStartDate] = useState(new Date());
  const [editedEndDate, setEditedEndDate] = useState(new Date());

  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [searchOption, setSearchOption] = useState("title"); //검색 옵션

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 삭제를 확인할 사용자 정보를 담을 상태
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/events/list")
      .then((response) => {
        if (response.data.success) {
          setEventData(response.data.events);
        } else {
          console.log("데이터를 가져오지 못했습니다.");
        }
      })
      .catch((err) => {
        console.error("오류가 발생했습니다", err);
      });
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);

    setEditedUID(event._id);
    setEditedTitle(event.title);
    setEditedDescription(event.description);
    setEditedStartDate(new Date(event.startDate));
    setEditedEndDate(new Date(event.endDate));
  };

  const handleUpdateClick = () => {
    // 선택한 날짜를 "YYYY-MM-DD" 형식으로 변환
    const formattedStartDate = editedStartDate.toISOString().split("T")[0];
    const formattedEndDate = editedEndDate.toISOString().split("T")[0];

    const updatedData = {
      id: editedUID,
      title: editedTitle,
      description: editedDescription,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    axios
      .post("/api/events/update", updatedData)
      .then((response) => {
        if (response.data.success) {
          // 업데이트 성공 시 사용자 정보 다시 불러오기
          axios.get("/api/events/list").then((response) => {
            if (response.data.success) {
              setEventData(response.data.events);
              setSelectedEvent(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedTitle("");
              setEditedDescription("");
              setEditedStartDate(new Date());
              setEditedEndDate(new Date());

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

  const handleSearchClick = () => {
    if (!searchTerm) {
      //검색어가 비어있을 경우
      toast.error("검색어를 입력해주세요.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    axios
      .get(`/api/events/search?option=${searchOption}&search=${searchTerm}`)
      .then((response) => {
        if (response.data.success) {
          setEventData(response.data.events);
        } else {
          // 검색 결과가 없을 때
          toast.error("검색 결과가 없습니다.", {
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
        console.error("검색 중 오류가 발생했습니다.", err);

        toast.error("검색 중 오류가 발생했습니다.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleListClick = () => {
    axios
      .get("/api/events/list")
      .then((response) => {
        if (response.data.success) {
          setEventData(response.data.events);
          setSearchTerm("");
          setSearchOption("title");
        } else {
          console.log("데이터를 가져오지 못했습니다.");
        }
      })
      .catch((err) => {
        console.error("오류가 발생했습니다", err);
      });
  };

  const handleCloseClick = () => {
    setSelectedEvent(null);

    setEditedUID("");
    setEditedTitle("");
    setEditedDescription("");
    setEditedStartDate(new Date());
    setEditedEndDate(new Date());
  };

  const handleAddClick = () => {
    if (!editedTitle || !editedDescription) {
      toast.error("모든 필수 정보를 입력해주세요.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // 선택한 날짜를 "YYYY-MM-DD" 형식으로 변환
    const formattedStartDate = editedStartDate.toISOString().split("T")[0];
    const formattedEndDate = editedEndDate.toISOString().split("T")[0];

    const body = {
      title: editedTitle,
      description: editedDescription,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    axios
      .post("/api/events/add", body)
      .then((response) => {
        if (response.data.success) {
          // 업데이트 성공 시 사용자 정보 다시 불러오기
          axios.get("/api/events/list").then((response) => {
            if (response.data.success) {
              setEventData(response.data.events);
              setSelectedEvent(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedTitle("");
              setEditedDescription("");
              setEditedStartDate(new Date());
              setEditedEndDate(new Date());

              toast.success("등록이 완료되었습니다.", {
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

          toast.error("등록에 실패하였습니다.", {
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

  const handleModalClick = () => {
    if (!selectedEvent) {
      return;
    }

    // 사용자 삭제 모달 열기
    setEventToDelete(selectedEvent);
    setIsConfirmModalOpen(true);
  };

  const handleModalDelete = () => {
    setIsConfirmModalOpen(false);

    const deleteEventId = eventToDelete._id;

    if (!eventToDelete) {
      return;
    }

    axios
      .delete("/api/events/delete", { data: { id: deleteEventId } })
      .then((response) => {
        if (response.data.success) {
          // 삭제 성공 시 사용자 목록을 다시 불러오기
          axios.get("/api/events/list").then((response) => {
            if (response.data.success) {
              setEventData(response.data.events);
              setSelectedEvent(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedTitle("");
              setEditedDescription("");
              setEditedStartDate(new Date());
              setEditedEndDate(new Date());

              toast.success("이벤트 정보가 삭제되었습니다.", {
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
          console.log("이벤트 정보 삭제 실패");

          toast.error("이벤트 정보 삭제에 실패하였습니다.", {
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

  const handleModalCancel = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="eventContent">
      <div className="eventList">
        <div className="eventSearch">
          <div className="searchTitle">
            <span>검색</span>
          </div>
          <div className="searchSelect">
            <Form.Select
              size="sm"
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="title">이벤트명</option>
              <option value="startDate">시작일</option>
              <option value="endDate">종료일</option>
            </Form.Select>
          </div>
          <div className="searchForm">
            <Form.Control
              size="sm"
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="searchButton">
            <button onClick={handleSearchClick}>
              <SearchIcon />
              <span>검색</span>
            </button>
          </div>
          <div className="searchButton">
            <button onClick={handleListClick}>
              <ReorderIcon />
              <span>전체 보기</span>
            </button>
          </div>
        </div>
        <div className="eventTableContainer">
          <div className="eventTable">
            <div className="tableHeader">
              <Table>
                <colgroup>
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "35%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                  <tr className="table-info">
                    <th>이벤트ID</th>
                    <th>이벤트명</th>
                    <th>시작일</th>
                    <th>종료일</th>
                  </tr>
                </thead>
              </Table>
            </div>
            <div className="tableContent">
              <Table>
                <colgroup>
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "35%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <tbody>
                  {eventData.map((event) => {
                    return (
                      <tr
                        key={event._id}
                        onClick={() => {
                          handleEventClick(event);
                        }}
                        className={selectedEvent === event ? "table-light" : ""}
                      >
                        <td>{event._id}</td>
                        <td>{event.title}</td>
                        <td>{event.startDate}</td>
                        <td>{event.endDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="eventInfo">
        <div className="infoContainer">
          {selectedEvent && (
            <div className="infoClose" onClick={handleCloseClick}>
              <CloseIcon />
            </div>
          )}
          <div className="infoFiled">
            <span className="filedName">이벤트명</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <div className="filedForm">
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="이벤트 내용"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">시작일</span>
            <div className="filedDatePicker">
              <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                selected={editedStartDate}
                value={editedStartDate}
                onChange={(date) => setEditedStartDate(date)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">종료일</span>
            <div className="filedDatePicker">
              <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                selected={editedEndDate}
                value={editedEndDate}
                onChange={(date) => setEditedEndDate(date)}
              />
            </div>
          </div>
          {selectedEvent ? (
            <div className="selectedButton">
              <Button variant="info" onClick={handleUpdateClick}>
                <EditNoteIcon />
                <span>수 정</span>
              </Button>
              <Button variant="danger" onClick={handleModalClick}>
                <DeleteIcon />
                <span>삭 제</span>
              </Button>
            </div>
          ) : (
            <div className="infoButton">
              <Button variant="info" onClick={handleAddClick}>
                <PostAddIcon />
                <span>신규 등록</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* 삭제 확인 모달 */}
      <Modal show={isConfirmModalOpen} onHide={handleModalCancel}>
        <Modal.Header closeButton>
          <Modal.Title>이벤트 정보 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {eventToDelete && (
            <div>
              <p>다음 사용자를 삭제하시겠습니까?</p>
              <p>이벤트ID : {eventToDelete._id}</p>
              <p>이벤트명 : {eventToDelete.title}</p>
              <p>종료일 : {eventToDelete.endDate}</p>
              {/* 필요한 사용자 정보 추가 */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCancel}>
            취소
          </Button>
          <Button variant="danger" onClick={handleModalDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EventContent;
