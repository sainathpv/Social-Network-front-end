class Cookie{
    
    static setCookie(name, data, date){
        console.log(date);
        document.cookie = name + "=" + data + ";path=/;expries=" + date.toUTCString();
    }
    
    static getCookie(name){
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
    
    static deleteCookie(name){
        var date = new Date();
        Cookie.setCookie(name, '', date);
    }
}

export default Cookie