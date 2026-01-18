<template>  
     
        <div class="w-full h-full flex justify-center items-center mt-[10%] font-inter">
            
            <div v-show="this.page != 0" class="background-global-effect"></div>
 
            <div v-if="!this.page" class="container-page text-white z-1 w-full h-full flex justify-center items-center flex-col mt-[32%]">   
                 
                <div class="dmv-page">
                    <div class="font-medium tracking-wide text-xl">მანანა</div>
                    <div class="font-medium tracking-wide text-sm opacity-50">თანამშრომელი</div>   
                    
                    <div class="flex flex-col justify-center bg-[rgba(59,52,98,0.77)] h-[5rem] w-[35rem] rounded font-medium tracking-wider text-xs mt-4">   
                        <span class="ml-2">მოგესალმებით</span> 
                        <span class="ml-2">აქ შეგიძლია აიღო მართვის მოწმობები</span> 
                          
                        <span class="ml-2 mt-5">როგორ შეგვიძლია დაგეხმაროთ</span> 
                    </div>   
                </div> 
 
                <div class="font-medium tracking-wide text-sm flex flex-row mt-4">  
                    <button @click="this.changePage(1)" class="rounded bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[16.2rem] h-[2.2rem] mx-5"><i class="fa-solid fa-play"></i> გამოცდის დაწყება</button> 
                    <button @click="this.changePage(0, 'close')" class="rounded bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[16.2rem] h-[2.2rem] mx-5"><i class="fa-solid fa-xmark"></i> გათიშვა</button>
                </div>  
            </div> 

            <div v-if="this.page == 1" class="container-page text-white z-1 w-full h-full flex justify-center items-center flex-col">   
                <img class="w-60 h-60" src="https://i.imgur.com/vE7Ovis.png"> 
                 
                <div class="flex justify-center items-center flex-col"> 
                    
                    <span class="font-medium text-base tracking-wide">.</span>  
                    <span class="font-medium text-base tracking-wide">არჩეული კატეგორიის მიუხედავად, ტესტი შედგება თეორიული და პრაქტიკული ტესტისგან, რომელშიც შემოწმდება თქვენი უნარები.</span>  
                </div> 

                <div class="w-2/5 rounded flex flex-col text-center mt-3">  
                    
                    <div :class="{'bg-darkPurple': this.questions.licence != null && !this.questions.licence}" @click="this.selectLicence(0)" class="rounded bg-darkBlack hover:bg-darkPurple w-full h-12 mt-2 flex items-center"> 
                        <i class="fa-solid fa-motorcycle font-semibold text-2xl ml-4"></i>
                       
                        <div class="flex flex-col font-medium text-sm ml-2 items-start w-11/12">
                            <span class="text-sm font-semibold tracking-wide w-auto">A კატეგორია</span>
                            <span class="text-xs font-normal tracking-wide opacity-80">ეს კატეგორია მოტოციკლეტიკლეტისთვისაა</span>
                        </div> 

                        <span class="text-sm font-semibold tracking-wide w-auto text-green-500 mr-4">$2.500</span>
                    </div>   
                    
                    <div :class="{'bg-darkPurple': this.questions.licence != null && this.questions.licence}" @click="this.selectLicence(1)" class="rounded bg-darkBlack hover:bg-darkPurple w-full h-12 mt-2 flex items-center"> 
                        <i class="fa-solid fa-car font-semibold text-2xl ml-4"></i> 
 
                        <div class="flex flex-col font-medium text-sm ml-2 items-start w-11/12">
                            <span class="text-sm font-semibold tracking-wide w-auto">B კატეგორია</span>
                            <span class="text-xs font-normal tracking-wide opacity-80">ეს კატეგორია მანქანის მძღოლებისთვისაა</span>
                        </div>

                        <span class="text-sm font-semibold tracking-wide w-auto text-green-500 mr-4">$5.000</span>
                    </div>  
                </div>
 
                <div class="font-medium tracking-wider text-base flex flex-row mt-7">  
                    <button @click="this.changePage(3)" class="rounded-full bg-purple-800 hover:bg-purple-700 w-32 h-7 mx-5"><i class="fa-solid fa-play"></i> დაწყება</button> 
                    <button @click="this.changePage(0, 'close')" class="rounded-full bg-red-600 hover:bg-red-700 w-32 h-7 mx-5"><i class="fa-solid fa-xmark"></i> გათიშვა</button>
                </div> 
            </div>
 
            <div v-if="this.page == 2" class="container-page text-white z-1 w-full h-full flex justify-center items-center flex-col">   
                <img class="w-60 h-60" src="https://i.imgur.com/vE7Ovis.png"> 
                 
                <div class="font-inter flex justify-center items-center flex-col"> 
                    
                    <span class="font-medium text-base tracking-wide"></span>  
                </div> 

                <div class="font-medium tracking-wider text-base flex flex-row mt-7">  
                    <button @click="this.changePage(3)" class="rounded-full bg-purple-800 hover:bg-purple-700 w-32 h-7 mx-5"><i class="fa-solid fa-play"></i> დაწ</button> 
                    <button @click="this.changePage(1)" class="rounded-full bg-red-600 hover:bg-red-700 w-32 h-7 mx-5"><i class="fa-solid fa-xmark"></i> უკან დაბრუნება</button>
                </div> 
            </div>

            <div v-if="this.page == 3" class="container-page text-white z-1 w-full h-full flex justify-center items-center flex-col mt-[10%]">  
                
                <div class="bg-darkPurple w-1/2 h-32 rounded flex flex-col justify-center text-center"> 
                    <img class="w-20 h-20" src="https://i.imgur.com/vE7Ovis.png">  
                  
                    <div class="font-normal text-sm flex flex-row w-full items-center">   
                        <div class="rounded bg-semiDark w-96 h-6 mx-2 flex items-center justify-center">{{5}} პირველი კითხვა.</div> 
                        <div class="rounded bg-semiDark w-96 h-6 mx-2 flex items-center justify-center">{{5 - (this.questions.corectly + this.questions.wrong)}} დარჩენილი კითხვები.</div> 
                        <div class="rounded bg-green-600 w-96 h-6 mx-2 flex items-center justify-center">{{this.questions.corectly}} სწორი.</div> 
                        <div class="rounded bg-red-700 w-96 h-6 mx-2 flex items-center justify-center">{{this.questions.wrong}} არასწორი.</div>  
                    </div>
                </div>

                <div class="bg-darkPurple w-1/2 h-14 rounded flex flex-col justify-center text-center mt-5">  
                    <div class="opacity-80 font-normal text-sm">Intrebarea #{{ this.questions.actual + 1 }}</div>
                    <div class="tracking-wide text-sm font-normal">{{this.dataQuestions[this.questions.actual].question}}</div> 
                </div>

                <div class="w-1/2 rounded flex flex-col justify-center text-center mt-3">  
                    <div :class="{'bg-darkPurple': this.questions.marked != null && this.questions.marked == 0}" @click="this.markResponse(0)" class="rounded bg-darkBlack hover:bg-darkPurple w-full h-12 mt-2 flex items-center">
                        <span class="w-8 font-semibold text-3xl ml-4">A</span>
                        <span class="min-w-min font-medium text-sm ml-2">{{ this.dataQuestions[this.questions.actual].responses[0] }}</span>
                    </div> 

                    <div :class="{'bg-darkPurple': this.questions.marked != null && this.questions.marked == 1}" @click="this.markResponse(1)" class="rounded bg-darkBlack hover:bg-darkPurple w-full h-12 mt-2 flex items-center">
                        <span class="w-8 font-semibold text-3xl ml-4">B</span>
                        <span class="min-w-min font-medium text-sm ml-2">{{ this.dataQuestions[this.questions.actual].responses[1] }}</span>
                    </div> 

                    <div :class="{'bg-darkPurple': this.questions.marked != null && this.questions.marked == 2}" @click="this.markResponse(2)" class="rounded bg-darkBlack hover:bg-darkPurple w-full h-12 mt-2 flex items-center">
                        <span class="w-8 font-semibold text-3xl ml-4">C</span>
                        <span class="min-w-min font-medium text-sm ml-2">{{ this.dataQuestions[this.questions.actual].responses[2] }}</span>
                    </div>   
                </div>
 
                <button class="rounded bg-darkBlack hover:bg-green-700 w-48 h-7 font-normal text-sm mx-5 flex items-center justify-center mt-2" @click="this.sendResponse()">
                    <i class="fa-solid fa-check mr-1"></i> Send response
                </button> 
            </div>

            <div v-if="this.page == 4" class="container-page text-white z-1 w-full h-full flex justify-center items-center flex-col mt-[15%]">  
 
                <i v-if="!this.questions.status" class="fa-solid fa-circle-check text-red-600" style="font-size: 6rem;"></i>
                <i v-if="this.questions.status" class="fa-solid fa-circle-check text-green-600" style="font-size: 6rem;"></i>

                <div class="mt-2 font-normal text-base tracking-wide">შენ {{this.questions.status ? 'ჩააბარე' : 'ჩაიჭერი'}}.</div>

                <div class="mt-3 font-normal text-sm tracking-wide"> 
                    {{this.questions.status ? 'გილოცავ! შენ წარმატებით ჩააბარე თეორიული გამოცდა.' : 'სამწუხაროდ შენ ჩაიჭერი'}}
                </div> 

                <div class="font-normal text-sm tracking-wide" v-if="this.questions.status"> 
                    შემდეგი ეტაპი არის პრაქტიკული გამოცდა
                </div>
            </div>  
        </div>
     
</template>
  
<script>  
    export default {
        name: 'DrivingComponent',

        data: function() 
        {
            return { 
                page: 0,
                questions: 
                {
                    corectly: 0,
                    wrong: 0,

                    actual: 0,
                    marked: null, 
                    status: true,

                    licence: null,
                },

                player:
                {
                    drivingLicence: false,
                    motorbikeLicence: false, 
                    money: 0, 
                },

                dataQuestions:
                [
                    { 
                        question: 'რა მოხდება თუ მანქანას მართვის მოწმობის გარეშე მართავ?', 
                        responses: ['გაგიუქმდება ლიცენზია', 'დაჯარიმდები', 'არაფერი'],
                        true: 1,
                    },

                    { 
                        question: 'რას გამოიწვევს მანქანის საპირისპირო მხარეს მართვა?', 
                        responses: ['მართვის მოწმობა გაგიუქმდება 2 საათით', 'არაფერს', 'ავტომობილს საჯარიმოზე გადაიყვანენ'],
                        true: 0,
                    },

                    { 
                        question: 'ავტობანზე მაქსიმალური დაშვებული სიჩქარე', 
                        responses: ['190 km/h', '130 km/h', '180 km/h'],
                        true: 1,
                    },

                    { 
                        question: 'რა უნდა მოვიმოქმედოთ როდესაც ყვითლიდან მწვანეზე გადადის შუქნიშანი', 
                        responses: ['გავჩერდეთ', 'ჩავიხედოთ სარკეში ', 'დავიძრათ.'],
                        true: 2,
                    }
                ]
            };
        },    

        mounted()
        { 
            window.DrivingComponent = this;   
        },

        methods: 
        {  
            open(data, option = true)
            {
                this.player = data;

                if(!option)
                    this.page = 3;

                if(option)
                {
                    this.page = 0;
                    this.questions =  
                    {
                        corectly: 0,
                        wrong: 0,

                        actual: 0,
                        marked: null, 
                        status: true 
                    };
                } 
            },

            selectLicence(licence)
            {
                if(this.questions.licence == licence)
                {
                    return this.questions.licence = null;
                }

                if((!licence && this.player.money < 2500) || (licence && this.player.money < 5000))
                {
                    return window.e_trigger('client::hud:sendNotify', 'ინფორმაცია', 'არ გაქვს საკმარისი თანხა', 'Banking:');  
                }
 
                return this.questions.licence = licence;
            },

            changePage(page, status = 'none')
            {
                if(page == 0 && status === 'close')
                {
                    if(window.e_rpc)
                    {
                        window.e_rpc('server:driving::examen:close');
                    }
                    return true;
                }

                if(page == 2 && this.questions.licence == null)
                    return;

                if(page == 3)
                {
                    if(window.e_rpc)
                    {
                        window.e_rpc('server:driving::examen:sendToComputer', JSON.stringify(this.questions));
                    }
                    return;
                }

                this.page = page;
            },

            markResponse(response) 
            {
                if(this.questions.marked == response)
                {
                    return this.questions.marked = null;
                }
 
                this.questions.marked = response; 
            },

            sendResponse()
            {  
                if(this.questions.wrong >= 1 || this.questions.actual >= 3)
                {
                    this.questions.marked = null;

                    this.page = 4;
                    this.questions.status = (this.questions.wrong >= 1 ? false : true)
 
                    if(window.e_rpc)
                    {
                        window.e_rpc(this.questions.status ? 'server:driving::examen:passed' : 'server:driving::examen:failed', this.questions.licence);
                    }

                    return console.log('examenul s-a terminat');
                }
  
                if(this.questions.marked != null)
                {
                    if(this.dataQuestions[this.questions.actual].true == this.questions.marked)
                    {
                        this.questions.corectly ++; 
                    }
                    else 
                    {
                        this.questions.wrong ++; 
                    } 
 
                    this.questions.actual ++; 
                    this.questions.marked = null;
                }
            }
        } 
    }
</script> 