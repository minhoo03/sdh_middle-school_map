let parseData = JSON.parse(JSON.stringify(Params));


let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.538921, 126.990606), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨
    };  
// 37.591203, 127.086295
let map = new kakao.maps.Map(mapContainer, mapOption); 

// 마커 클러스터러를 생성합니다 
let clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 10 // 클러스터 할 최소 지도 레벨 
});



const setMarker_data = (address, address_name) => {


    let data = {
            "positions": [
            {
                title: '서울 디지텍 고등학교', 
                lat: 37.538921,
                lng: 126.990606
            }
        ]
    }



    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function(result, status) {
    
        data.positions.push({
            title: address_name,
            lat: result[0].y,
            lng: result[0].x
            // latlng: coords
        })


        var markers = data.positions.map(function(address) {
            return new kakao.maps.Marker({
                position : new kakao.maps.LatLng(address.lat, address.lng)
            });
        });

        clusterer.addMarkers(markers);


        // for (let i = 0; i < positions.length; i ++) {

        //     let marker = new kakao.maps.Marker({
        //         position: new kakao.maps.LatLng(positions[i].lat, positions[i].lng), // 마커를 표시할 위치
        //         title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        //     });   

        //     marker.setMap(map)
        // }
    });     
}



for(let i = 0; i <= parseData.length; i++) {
    let address_parseData = parseData[i].주소
    let address_name_parseData = parseData[i].중학교명

    setMarker_data(address_parseData ,address_name_parseData)
    
}
