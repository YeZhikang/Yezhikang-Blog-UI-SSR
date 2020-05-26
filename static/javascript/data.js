const navTranslateArr =  [
    {
        name: 'About ABC',
        translate: 'about',
        links: [
            {
                title: '学院简介',
                translate: 'academy-introduce'
            },
            {
                title: '学院理事',
                translate: 'academy-manager'
            },
            {
                title: '学院领导',
                translate: 'academy-leader'
            },
            {
                title: '机构设置',
                translate: 'organ-set'
            },
        ]
    },
    {
        name: '学院动态',
        translate: 'academy-active',
        links: [
            {
                title: '学院动态',
                translate: 'index'
            },
            {
                title: '学院简介',
                translate: 'academy-introduce'
            },
            {
                title: '人才招聘',
                translate: 'academy-hire'
            },

        ]
    },
    {
        name: '信息公开',
        translate: 'academy-news',
        links: [
            {
                title: '信息公开',
                translate: 'index'
            },
            {
                title: '院务信息',
                translate: 'academy-self'
            },
            {
                title: '党务信息',
                translate: 'academy-part'
            },
            {
                title: '其他信息',
                translate: 'academy-other'
            }
        ]
    },
    {
        name: '科学研究',
        translate: 'research',
        links: [
            {
                title: '科学研究',
                translate: 'index'
            },
            {
                title: '学术成果',
                translate: 'cate-achievement'
            },
            {
                title: '科研成果',
                translate: 'sci-achievement'
            },
            {
                title: '科研机构',
                translate: 'sci-organ'
            }
        ]
    },
    {
        name: '学生工作',
        translate: 'stu-work',
        links: [
            {
                title: '学生工作',
                translate: 'index'
            },
            {
                title: '思政工作',
                translate: 'political-work'
            },
            {
                title: '团学动态',
                translate: 'league-study'
            },
            {
                title: '学生事务',
                translate: 'student-management'
            },
            {
                title: '创新创业',
                translate: 'create-work'
            },
            {
                title: '心理健康',
                translate: 'mind-health'
            }
        ]
    },
    {
        name: '实习就业',
        translate: 'work',
        links: [
            {
                title: '实习信息',
                translate: 'internship-info'
            },
            {
                title: '就业信息',
                translate: 'offer-info'
            },
        ]
    },
    {
        name: '党建工作',
        translate: 'party-construction',
        links: [
            {
                title: '党建动态',
                translate: 'active'
            },
            {
                title: '主题教育',
                translate: 'edu'
            },
            {
                title: '党纪党规',
                translate: 'rules'
            },
        ]
    },
]

const checkTranslate = (parName, name) => {
    let transParName, transName
    for(let item of navTranslateArr){
        if(item.name === parName){
            for(let link of item.links){
                if(link.title === name){
                    transParName = item.translate
                    transName = link.translate
                }
            }
        }
    }

    return {
        transParName, transName
    }
}


const checkBack = (transParName, transName) => {
    let parName, name
    for(let item of navTranslateArr){
        if(item.translate === transParName){
            for(let link of item.links){
                if(link.translate === transName){
                    parName = item.name
                    name = link.title
                }
            }
        }
    }

    return {
        parName, name
    }
}

export { checkBack, checkTranslate }
