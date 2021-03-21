var parseData = JSON.parse(JSON.stringify(Params));
// console.log(parseData[0].주소)

var address_parseData = parseData[0].주소

const mainMap = () => {

let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨
    };  
    // 37.591203, 127.086295
let map = new kakao.maps.Map(mapContainer, mapOption); 



let positions = [
    {
        title: '카카오', 
        latlng: new kakao.maps.LatLng(33.450705, 126.570677)
    },
    {
        title: '생태연못', 
        latlng: new kakao.maps.LatLng(33.450936, 126.569477)
    },
    {
        title: '근린공원',
        latlng: new kakao.maps.LatLng(33.451393, 126.570738)
    },
    {
        title: '텃밭', 
        latlng: new kakao.maps.LatLng(33.450879, 126.569940)
    },

];


let geocoder = new kakao.maps.services.Geocoder();

geocoder.addressSearch(address_parseData, function(result, status) {
    console.log('1',result[0].x)

        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log('2',coords)
        positions.push({
            title: result[0].address_name,
            latlng: coords
        })

        for (let i = 0; i < positions.length; i ++) {

            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            });
    
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
        }
});   
console.log('3',positions)

}
mainMap()