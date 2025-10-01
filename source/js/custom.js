// 判断是否为首页类。有很多种方法, 有空我找一下最优解
const isIndex=()=>{
    const href = window.location.href;
    const protocol = window.location.protocol+"//"+window.location.host+"/";
    return href === protocol || href === protocol + "categories/" || href === protocol + "tags/" || href === protocol + "archives/" || href === protocol + "rss/" || href === protocol + "wiki/" || href === protocol + "links/" || href === protocol + "about/";
}
if (!isIndex()){
    var ThisCategory = document.querySelector("#breadcrumb > a.cap.breadcrumb-link").text;
    if (ThisCategory == "第九艺术") {
        document.querySelector("#start > div > article > h1").style.display = 'none';
        document.querySelector("#start > div > article > div:nth-child(3)").style.textAlign = 'center';
    }
}

