let parseData = JSON.parse(JSON.stringify(Params));
let address_parseData
let address_name_parseData
let teachers_parseData


let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.538921, 126.990606), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };  

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

const setMarker_data = (address, address_name, teachers, selected_teachers) => {

    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function(result, status) {
    
    
        data.positions.push({
            title: address_name,
            teachers: teachers,
            lat: result[0].y,
            lng: result[0].x
            // latlng: coords
        })

        var markers = data.positions.map(function(address) {
            return new kakao.maps.Marker({
                title: address_name,
                teachers: teachers,
                position : new kakao.maps.LatLng(address.lat, address.lng)
            });
        });

        if(teachers == selected_teachers+"선생님") {
            clusterer.addMarkers(markers);
        }

    }); 
        
}

function myFunction (val) {

    let selected_teachers = val;

    data = {
        "positions": [
        {
          
        }
    ]
    }

    for(let i = 0; i <= parseData.length; i++) {
        address_parseData = parseData[i].주소
        address_name_parseData = parseData[i].중학교명
        teachers_parseData = parseData[i].홍보교사
    
        setMarker_data(address_parseData ,address_name_parseData, teachers_parseData, selected_teachers)
    }
    
}

