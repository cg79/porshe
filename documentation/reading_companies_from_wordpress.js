const companies = [];
let count = 0;

const slides = document.getElementsByClassName('slide');
for (let slide of slides) {
    count++;

    const overlay = slide.querySelector('.overlay');

    const imageWrapper = overlay.querySelector('.image-wrapper');
    const imageWrapperImg = imageWrapper.querySelector('img');

    //console.log(imageWrapperImg.src)
    //console.log(imageWrapperImg.srcset)

    const infos = overlay.querySelector('.infos');
    const entries = infos.querySelectorAll('.entry');

    if (entries[0]) {


        let companyAhref = {
            href: ''
        };

        if (entries[3]) {
            companyAhref = entries[3].querySelector('a');
        }


        const company = {
            id: count,
            entrepreneurs: entries[0].querySelector('.text').innerText,
            img: imageWrapperImg.src,
            srcset:imageWrapperImg.srcset,
            revenue: '2M',
            employee: 51,
            liquidity: '500k',
            //name: entries[1].querySelector('.text').innerText,
            //location: entries[2].querySelector('.text').innerText,
            //url: companyAhref.href
        };

        if(entries[1]){
            company.name = entries[1].querySelector('.text').innerText;
        }

        if(entries[2]){
            company.location = entries[2].querySelector('.text').innerText;
        }

        if(entries[3]){
            company.url = companyAhref.href
        }

        companies.push(company);
    }

}

console.log(JSON.stringify(companies,null, 4))
    