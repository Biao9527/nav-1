let $siteList = $('.siteList')
const $lastLi = $siteList.find('.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'G' , url: 'https://github.com'},
    {logo: 'J' , url: 'https://juejin.cn'},
    {logo: 'G' , url: 'https://google.com'},
    {logo: 'B' , url: 'https://bilibili.com'}
]
const simplifyUrl = (url)=>{
    return url.replace('http://' , '')
    .replace('https://','')
    .replace('www.','')
    .replace(/\/.*/,'')
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
                const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">
                        ${(node.logo).toUpperCase() }
                    </div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                    </div>
                </div>   
        </li>
            `).insertBefore($lastLi)
            $li.on('click' , ()=>{
                window.open(node.url)
            })
            $li.on('click' , '.close',(e)=>{
                e.stopPropagation()
                hashMap.splice(index , 1)
                render()
            })
    })
}
render()

$('.addButton')
.on('click',()=>{
    let url = window.prompt('请问你要输入的网址是啥？')
    if(url.indexOf('http') !== 0){
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0] , logoType: 'text' , url: url
    })
    render()
})
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x' , string)
}

$(document).on('keypress',(e)=>{
    const key = e.key
    for(let i = 0;i<hashMap.length;i++){
        if((hashMap[i].logo).toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})