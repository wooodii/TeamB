import { useContext, useState } from "react";
import { doc,getDoc} from "firebase/firestore"
import { db } from "../Firebase";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../data/DataContext";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import "../css/Mypage.css";

const MyPage = () => {
    const data = useContext(DataContext);
    const navigate = useNavigate();
    const [name,setName] = useState();
    console.log(data.state.startDate) 
    const user = localStorage.getItem("currentUser")
    const getSingleData = async () => {
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().history.date)
        if (docSnap.exists()) {
          setName(docSnap.data().name);
        }
      };
      console.log(name)
      useEffect(()=>{
        getSingleData()
      },[])
    const logOut =()=>{
        localStorage.clear(); 
        navigate('/'); 
    }
    useEffect(()=>{
      if(user){
        data.action.setIsLoginned(true)
      } else {
        data.action.setIsLoginned(false)
      }
    },[user])
    return (  
        <div className="Mypage"> 
        {data.state.isLoginned ? (
          <>
            <div className="Mypage_first">
                {/* 프로필,이름 */}
                <p>{name} <button onClick={()=>{navigate('/editprofile')}}>수정버튼</button> </p> 
                <button onClick={()=>{logOut()}}>로그아웃</button>
            </div> 
            <hr/> 
            <div className="Mypage_second">    
              <h3>건강피드</h3>
            </div>   
            <hr/>  
            <div className="Mypage_third">
                <h3>복약관리</h3>
            </div> 
            <hr/>
            <div className="Mypage_forth"></div>  
                 {/* 이부분은 버튼만있고 따로 기능없습니다 */}
                <button> 고객센터 </button>
                <Button>dd</Button>
          </>
        ):(

          <> 
            <div className="Mypage_first">
                  {/* 프로필,이름 */}
                  <Link to='/firebaselogin'>로그인</Link>
              </div>
              <hr/>
              <div className="Mypage_second">

                <h1>예약하기</h1>

              </div>
              <hr/>
              <div className="Mypage_third"></div>
              <Link to='/medicine'>복약관리</Link>


              <hr/>
              <div className="Mypage_forth"></div>
              {/* 이부분은 버튼만있고 따로 기능없습니다 */}
              <button> 고객센터 </button>
              <div className="Btn_L_G">1:1채팅상담</div>
              <div className="Btn_L_G">사용자 설문</div>
              <div className="Btn_L_G">약관 보기</div>
              <div className="Btn_L_G">버전</div>
          </>
        )}
        </div>  
    ); 
}

export default MyPage;



