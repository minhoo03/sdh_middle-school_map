let parseData = JSON.parse(JSON.stringify(Params));


let address_parseData
let address_name_parseData
let teachers_parseData
let student_parseData

let parseData_2018
let parseData_2019
let parseData_2020
let parseData_2021


let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.538921, 126.990606), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  
// 37.591203, 127.086295
let map = new kakao.maps.Map(mapContainer, mapOption); 


// 마커 클러스터러를 생성합니다 
let clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 8 // 클러스터 할 최소 지도 레벨 
});


let data = {
    "positions": [
        {
        
        }
    ]
}

let markers


const setMarker_data = (address, address_name, teachers, selected_teachers, student, p2018, p2019, p2020, p2021) => {

    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function(result, status) {
    
    
        data.positions.push({
            title: address_name,
            teachers,
            lat: result[0].y,
            lng: result[0].x,
            student,
            p2018,
            p2019,
            p2020,
            p2021
            // latlng: coords
        })


        markers = data.positions.map(function(address) {
            return new kakao.maps.Marker({
                title: address_name+', \n전체학생: '+student+"명, \n2018년도: "+p2018+"명, \n2019년도: "+p2019+"명, \n2020년도: "+p2020+"명, \n2021년도: "+p2021+"명",
                teachers,
                student,
                position : new kakao.maps.LatLng(address.lat, address.lng)
            });
        });

        switch(selected_teachers) {
            case "전체선생님" :
                clusterer.addMarkers(markers)
                break;

            case "none" :
                // for(let i = 0; i <= markers.length; i++) {
                //     clusterer.clear()
                // }
                clusterer.clear()
                break;

            case "3명이상선생님" : 
                if(student >= 3) {
                    clusterer.addMarkers(markers)
                }
                break;

            case "5명이상선생님" : 
                if(student >= 5) {
                    clusterer.addMarkers(markers)
                }
                break;

            case "7명이상선생님" : 
                if(student >= 7) {
                    clusterer.addMarkers(markers)
                }
                break;

            case "9명이상선생님" : 
                if(student >= 9) {
                    clusterer.addMarkers(markers)
                }
                break;

            default :
                if(teachers == selected_teachers) {
                    clusterer.addMarkers(markers);
                }
                break;
        }

        data.positions.pop({
            title: address_name,
            teachers: teachers,
            lat: result[0].y,
            lng: result[0].x
            // latlng: coords
        })

    }); 
        
}

function myFunction (val) {

    // let option = document.getElementById("ddlViewBy");
    // let selected_teachers = option.value;

    let selected_teachers = val;
    clusterer.clear()

    for(let i = 0; i <= parseData.length; i++) {

        for(let x = 0; x < parseData[i].학생수; x++){
            address_parseData = parseData[i].주소
            address_name_parseData = parseData[i].중학교명
            teachers_parseData = parseData[i].홍보교사
            student_parseData = parseData[i].학생수

            parseData_2018 = parseData[i].입학2018년
            parseData_2019 = parseData[i].입학2019년
            parseData_2020 = parseData[i].입학2020년
            parseData_2021 = parseData[i].입학2021년

            console.log('2018년!!',parseData_2018)
        
            setMarker_data(address_parseData ,address_name_parseData, teachers_parseData, selected_teachers+"선생님", student_parseData, parseData_2018, parseData_2019, parseData_2020, parseData_2021)
        }
    }
}
