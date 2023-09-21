import React, { useEffect, useState } from "react";
import "./couponcontent.css";

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

function CouponContent() {
  const [couponData, setCouponData] = useState([]);

  const [selectedCoupon, setSelectedCoupon] = useState();

  const [editedUID, setEditedUID] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDiscountType, setEditedDiscountType] = useState("금액 할인");
  const [editedDiscountAmount, setEditedDiscountAmount] = useState("");
  const [editedavailability, setEditedavailability] = useState("사용 가능");

  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [searchOption, setSearchOption] = useState("title"); //검색 옵션

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 삭제를 확인할 사용자 정보를 담을 상태
  const [couponToDelete, setCouponToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("/api/coupons/list")
      .then((response) => {
        if (response.data.success) {
          setCouponData(response.data.coupons);
        } else {
          console.log("데이터를 가져오지 못했습니다.");
        }
      })
      .catch((err) => {
        console.error("오류가 발생했습니다", err);
      });
  }, []);

  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon);

    setEditedUID(coupon._id);
    setEditedTitle(coupon.title);
    setEditedDescription(coupon.description);
    setEditedDiscountType(coupon.discountType);
    setEditedDiscountAmount(coupon.discountAmount);
    setEditedavailability(coupon.availability);
  };

  const handleUpdateClick = () => {
    const updatedData = {
      id: editedUID,
      title: editedTitle,
      description: editedDescription,
      discountType: editedDiscountType,
      discountAmount: editedDiscountAmount,
      availability: editedavailability,
    };

    axios
      .post("/api/coupons/update", updatedData)
      .then((response) => {
        if (response.data.success) {
          // 업데이트 성공 시 사용자 정보 다시 불러오기
          axios.get("/api/coupons/list").then((response) => {
            if (response.data.success) {
              setCouponData(response.data.coupons);
              setSelectedCoupon(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedTitle("");
              setEditedDescription("");
              setEditedDiscountType("금액 할인");
              setEditedDiscountAmount("");
              setEditedavailability("사용 가능");

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
      .get(`/api/coupons/search?option=${searchOption}&search=${searchTerm}`)
      .then((response) => {
        if (response.data.success) {
          setCouponData(response.data.coupons);
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
      .get("/api/coupons/list")
      .then((response) => {
        if (response.data.success) {
          setCouponData(response.data.coupons);
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
    setSelectedCoupon(null);

    setEditedUID("");
    setEditedTitle("");
    setEditedDescription("");
    setEditedDiscountType("금액 할인");
    setEditedDiscountAmount("");
    setEditedavailability("사용 가능");
  };

  const handleAddClick = () => {
    if (!editedTitle || !editedDescription || !editedDiscountAmount) {
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
      title: editedTitle,
      description: editedDescription,
      discountType: editedDiscountType,
      discountAmount: editedDiscountAmount,
      availability: editedavailability,
    };

    axios
      .post("/api/coupons/add", body)
      .then((response) => {
        if (response.data.success) {
          // 업데이트 성공 시 사용자 정보 다시 불러오기
          axios.get("/api/coupons/list").then((response) => {
            if (response.data.success) {
              setCouponData(response.data.coupons);
              setSelectedCoupon(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedTitle("");
              setEditedDescription("");
              setEditedDiscountType("금액 할인");
              setEditedDiscountAmount("");
              setEditedavailability("사용 가능");

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
    if (!selectedCoupon) {
      return;
    }

    // 사용자 삭제 모달 열기
    setCouponToDelete(selectedCoupon);
    setIsConfirmModalOpen(true);
  };

  const handleModalDelete = () => {
    setIsConfirmModalOpen(false);

    const deleteCouponId = couponToDelete._id;

    if (!couponToDelete) {
      return;
    }

    axios
      .delete("/api/coupons/delete", { data: { id: deleteCouponId } })
      .then((response) => {
        if (response.data.success) {
          // 삭제 성공 시 사용자 목록을 다시 불러오기
          axios.get("/api/coupons/list").then((response) => {
            if (response.data.success) {
              setCouponData(response.data.coupons);
              setSelectedCoupon(null); // 선택된 사용자 초기화

              setEditedUID("");
              setEditedTitle("");
              setEditedDescription("");
              setEditedDiscountType("금액 할인");
              setEditedDiscountAmount("");
              setEditedavailability("사용 가능");

              toast.success("쿠폰 정보가 삭제되었습니다.", {
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
          console.log("쿠폰 정보 삭제 실패");

          toast.error("쿠폰 정보 삭제에 실패하였습니다.", {
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
    <div className="couponContent">
      <div className="couponList">
        <div className="couponSearch">
          <div className="searchTitle">
            <span>검색</span>
          </div>
          <div className="searchSelect">
            <Form.Select
              size="sm"
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
            >
              <option value="title">쿠폰명</option>
              <option value="discountType">할인 종류</option>
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
        <div className="couponTableContainer">
          <div className="couponTable">
            <div className="tableHeader">
              <Table>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                  <tr className="table-info">
                    <th>쿠폰ID</th>
                    <th>쿠폰명</th>
                    <th>할인종류</th>
                    <th>할인금액</th>
                    <th>사용가능여부</th>
                  </tr>
                </thead>
              </Table>
            </div>
            <div className="tableContent">
              <Table>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <tbody>
                  {couponData.map((coupon) => {
                    return (
                      <tr
                        key={coupon._id}
                        onClick={() => {
                          handleCouponClick(coupon);
                        }}
                        className={
                          selectedCoupon === coupon ? "table-light" : ""
                        }
                      >
                        <td>{coupon._id}</td>
                        <td>{coupon.title}</td>
                        <td>{coupon.discountType}</td>
                        <td>{coupon.discountAmount}</td>
                        <td>
                          {coupon.availability === "사용 가능" ? "O" : "X"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="couponInfo">
        <div className="infoContainer">
          {selectedCoupon && (
            <div className="infoClose" onClick={handleCloseClick}>
              <CloseIcon />
            </div>
          )}
          <div className="infoFiled">
            <span className="filedName">쿠폰명</span>
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
                rows={8}
                placeholder="쿠폰 내용"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">할인 종류</span>
            <div className="filedForm">
              <Form.Select
                aria-label="할인 종류"
                value={editedDiscountType}
                onChange={(e) => setEditedDiscountType(e.target.value)}
              >
                <option value="금액 할인">금액 할인</option>
                <option value="퍼센트 할인">퍼센트 할인</option>
              </Form.Select>
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">할인 금액</span>
            <div className="filedForm">
              <Form.Control
                size="sm"
                type="text"
                value={editedDiscountAmount}
                onChange={(e) => setEditedDiscountAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="infoFiled">
            <span className="filedName">사용가능여부</span>
            <div className="filedForm">
              <Form.Select
                aria-label="사용 가능 여부"
                value={editedavailability}
                onChange={(e) => setEditedavailability(e.target.value)}
              >
                <option value="사용 가능">사용 가능</option>
                <option value="사용 불가능">사용 불가능</option>
              </Form.Select>
            </div>
          </div>
          {selectedCoupon ? (
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
          <Modal.Title>쿠폰 정보 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {couponToDelete && (
            <div>
              <p>다음 쿠폰을 삭제하시겠습니까?</p>
              <p>쿠폰ID : {couponToDelete._id}</p>
              <p>쿠폰명 : {couponToDelete.title}</p>
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

export default CouponContent;
