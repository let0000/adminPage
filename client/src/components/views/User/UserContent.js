import React, { useEffect, useState } from "react";
import "./usercontent.css";
import SearchIcon from "@mui/icons-material/Search";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ReorderIcon from "@mui/icons-material/Reorder";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UserContent() {
  const [userData, setUserData] = useState([]);

  const [selectedUser, setSelectedUser] = useState();

  const [editedUID, setEditedUID] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedGender, setEditedGender] = useState("남성");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedDetailAddress, setEditedDetailAddress] = useState("");
  const [editedBirth, setEditedBirth] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [searchOption, setSearchOption] = useState("name"); //검색 옵션

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 삭제를 확인할 사용자 정보를 담을 상태
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/users/list")
      .then((response) => {
        if (response.data.success) {
          setUserData(response.data.users);
        } else {
          console.log("데이터를 가져오지 못했습니다.");
        }
      })
      .catch((err) => {
        console.error("오류가 발생했습니다", err);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);

    setEditedUID(user._id);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedPhone(user.phone);
    setEditedGender(user.gender);
    setEditedAddress(user.address);
    setEditedDetailAddress(user.detailAddress);
    setEditedBirth(user.birth);
  };

  const handleUpdateClick = () => {
    const updatedData = {
      id: editedUID,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      gender: editedGender,
      address: editedAddress,
      detailAddress: editedDetailAddress,
      birth: editedBirth,
    };

    axios
      .post("/api/users/update", updatedData)
      .then((response) => {
        if (response.data.success) {
          // 업데이트 성공 시 사용자 정보 다시 불러오기
          axios.get("/api/users/list").then((response) => {
            if (response.data.success) {
              setUserData(response.data.users);
              setSelectedUser(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedName("");
              setEditedEmail("");
              setEditedPhone("");
              setEditedGender("남성");
              setEditedAddress("");
              setEditedDetailAddress("");
              setEditedBirth("");

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
      .get(`/api/users/search?option=${searchOption}&search=${searchTerm}`)
      .then((response) => {
        if (response.data.success) {
          setUserData(response.data.users);
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
      .get("/api/users/list")
      .then((response) => {
        if (response.data.success) {
          setUserData(response.data.users);
          setSearchTerm("");
          setSearchOption("name");
        } else {
          console.log("데이터를 가져오지 못했습니다.");
        }
      })
      .catch((err) => {
        console.error("오류가 발생했습니다", err);
      });
  };

  const handleCloseClick = () => {
    setSelectedUser(null);

    setEditedUID("");
    setEditedName("");
    setEditedEmail("");
    setEditedPhone("");
    setEditedGender("남성");
    setEditedAddress("");
    setEditedDetailAddress("");
    setEditedBirth("");
  };

  const handleAddClick = () => {
    if (
      !editedName ||
      !editedEmail ||
      !editedPhone ||
      !editedAddress ||
      !editedDetailAddress ||
      !editedBirth
    ) {
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

    const body = {
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      gender: editedGender,
      address: editedAddress,
      detailAddress: editedDetailAddress,
      birth: editedBirth,
    };

    axios
      .post("/api/users/add", body)
      .then((response) => {
        if (response.data.success) {
          // 업데이트 성공 시 사용자 정보 다시 불러오기
          axios.get("/api/users/list").then((response) => {
            if (response.data.success) {
              setUserData(response.data.users);
              setSelectedUser(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedName("");
              setEditedEmail("");
              setEditedPhone("");
              setEditedGender("남성");
              setEditedAddress("");
              setEditedDetailAddress("");
              setEditedBirth("");

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
    if (!selectedUser) {
      return;
    }

    // 사용자 삭제 모달 열기
    setUserToDelete(selectedUser);
    setIsConfirmModalOpen(true);
  };

  const handleModalDelete = () => {
    setIsConfirmModalOpen(false);

    const deleteUserId = userToDelete._id;

    if (!userToDelete) {
      return;
    }

    axios
      .delete("/api/users/delete", { data: { id: deleteUserId } })
      .then((response) => {
        if (response.data.success) {
          // 삭제 성공 시 사용자 목록을 다시 불러오기
          axios.get("/api/users/list").then((response) => {
            if (response.data.success) {
              setUserData(response.data.users);
              setSelectedUser(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedName("");
              setEditedEmail("");
              setEditedPhone("");
              setEditedGender("남성");
              setEditedAddress("");
              setEditedDetailAddress("");
              setEditedBirth("");

              toast.success("사용자가 삭제되었습니다.", {
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
          console.log("사용자 삭제 실패");

          toast.error("사용자 삭제에 실패하였습니다.", {
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

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return phone;
  };

  return (
    <div className="userContent">
      <div className="userList">
        <div className="userSearch">
          <div className="searchTitle">
            <span>검색</span>
          </div>
          <div className="searchSelect">
            <Form.Select
              size="sm"
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="name">이름</option>
              <option value="email">이메일</option>
              <option value="phone">전화번호</option>
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
        <div className="userTableContainer">
          <div className="userTable">
            <div className="tableHeader">
              <Table>
                <colgroup>
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                </colgroup>
                <thead>
                  <tr className="table-info">
                    <th>UID</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                  </tr>
                </thead>
              </Table>
            </div>
            <div className="tableContent">
              <Table>
                <colgroup>
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                </colgroup>
                <tbody>
                  {userData.map((user) => {
                    return (
                      <tr
                        key={user._id}
                        onClick={() => handleUserClick(user)}
                        className={selectedUser === user ? "table-light" : ""}
                      >
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{formatPhoneNumber(user.phone)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="userInfo">
        <div className="infoContainer">
          {selectedUser && (
            <div className="infoClose" onClick={handleCloseClick}>
              <CloseIcon />
            </div>
          )}

          {selectedUser && (
            <div className="infoFiled">
              <span className="filedName">UID</span>
              <div className="filedForm">
                <Form.Control
                  size="sm"
                  type="text"
                  value={editedUID}
                  readOnly
                />
              </div>
            </div>
          )}
          <div className="infoFiled">
            <span className="filedName">이름</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">이메일</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">전화번호</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={isEditing ? editedPhone : formatPhoneNumber(editedPhone)}
                onChange={(e) => setEditedPhone(e.target.value)}
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">성별</span>
            <div className="filedForm">
              <Form.Select
                aria-label="성별"
                value={editedGender}
                onChange={(e) => setEditedGender(e.target.value)}
              >
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </Form.Select>
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">주소</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">상세주소</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedDetailAddress}
                onChange={(e) => setEditedDetailAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">생년월일</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedBirth}
                onChange={(e) => setEditedBirth(e.target.value)}
              />
            </div>
          </div>
          {selectedUser ? (
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
          <Modal.Title>사용자 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userToDelete && (
            <div>
              <p>다음 사용자를 삭제하시겠습니까?</p>
              <p>UID : {userToDelete._id}</p>
              <p>이름 : {userToDelete.name}</p>
              <p>이메일 : {userToDelete.email}</p>
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

export default UserContent;
