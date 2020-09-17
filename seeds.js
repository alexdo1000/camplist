var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Cloudy Rest", 
        image:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1516125062%2Fgrand-teton-national-park-wyoming-SCENICCAMP0118.jpg%3Fitok%3Dakrvix61&q=85",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Somber Lake", 
        image:"https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1516125062/sawtooth-national-forest-idaho-SCENICCAMP0118.jpg?itok=Bcp2AmTm",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Illuminated Shore", 
        image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhMWFhUVFRUVFRcYFxUVFRUVFRUWFhcVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGislHx0uLS0tLSstLS0tLS0tLS0tLS0tLS8tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS8tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAACBQEGBwj/xAA+EAACAQIDBQUFBwIGAgMAAAABAgADEQQhMQUSQVFxYYGRobEGEyIywRRCUmLR4fBykhVDgqKy8VPCFiMz/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EACkRAAICAQMEAAYDAQAAAAAAAAABAhEDEiFBBBMxUQUUMkKhsWFxkSL/2gAMAwEAAhEDEQA/ABzkvuzlpNNH0zRUwbPC2gK1AHiRKponJMq1SUatE6+DfgTFHpVRxMsqOWbkuDV98J0NMYJVhqYqSqZFtmpOGK06j8QYwHHbHTFZVoNocrKFZVMlJC5lCIdlg2WOmSaAGVMKVlCI9k2gRgzDFZQrGsRoCZUwpWUImsWgRlTCkShEwKBGDaFYQZWYAMyhhGEoRMYoZQwhEoYAlDBmEaDMDMUMoZcyjSbCUaUMuZQycjFZJJJMJ9NGPvz71MMtcnTdkV1IBBBBzBBuCDO9/lPJU16PqtL9nd4nUeBi2Mx1Glb3tQIToGIueg1hjfmPCeY9qNnVKj75KLTVQGZnABO9fLK98+efZxrFnPmcoxuKs7g/axPeMKoAp2+GoA9iQCSSDmL2yFieus9QhBAIGRAIuCDnzB0nzgjEUVYUyTSBuWWzIx3QQ3G2RE16G16tOgzkrVLEAsKxYJw+UDeS9+d76yiZxY87Vqf6NxvaDC7+57xd7e3dGIvcD5rW4635zUAnyFahBBF73vqb+Izns/Zba18qtZbt8NKioFlAsNFGXIAm9rntjqQmLqNbqR6u0qROb84WlVIu4nCJRhLGctKKRJwBEShEObTlhHUibgLFZRkje5KlI6kScBNkgyscZYJgI6kTcRYrKFYw1oMmNqEcRcrKFYwZRodQriLlYNljLQbCGxdLFmWUYRgiDZYLBpF2EGwjDJBsk1moXaDaMMkGwgAAIlCIZhBmK0YERKGFMGwk2glJJJ2TCai+0tVSt0UWQra5AvwNjoRbSZi7Uq74dqjXBOY4XNzYaWvY20yidWqWN2NzzlJwqKR0T6icn9T2NnHbcqe+NSkxX4dy+R3lHGxGWefUmNLhcXi1BNRCu8ciV+E6ZhR/L9s85G8BtKpSvuNYG9wcxfnbnkIa9BjmuT7jdP0zawW1HwZq0ahLG+8ChuN8i9/itcG488jEKuMw9Srv1KbrT3bWTc3rgAA6DjcnPjK0Vau+bXdmQFslFmsCN02Btn2wG095amZFxoQRoDYXtkD8PZ5wbWPOctF/ansKEi5te33b2BAvlfttDYHFvTYMrEWIvblf9L+Ji8kY5VJp2j6P7P7YStvKzfFvMVUqQwp72VyBY6jTsvD4vbVGm24TY3sSwKqNM945HUGwz6TwOA2i1JaoFwzqAGzBGeZvfkTzztFauILEk2ufLTMduUys7vnKglyfRsBtVazVFQf/AJkAkgWN72KkE30jbUL8x0ynzzZG02pF/j3d8BWYhnYAfgAy3uV8p6XZvtTTISkEYG+6LtcBRozMTy1746myuLNCa/6e5tNhfzN4wL4RuDN/O+OlhxJHdKGmn/kPnKqbKSxLj9ma1Ejie8GcDW4+o9RNZVT8fpCe5Q8L90buE+w34ZjjEc/US4xCfz9po1MKv4T4Repg1H3TGU0xHhkhcOh0IkKDslKmHp87dYPcA0cecpZJxCFBKlRItYcWXzEsai818RDbBpQErKlJc24eRnC44+sOoRwBGnBskK1ZeY8RBPiF5w2TcQbJBMkI2JXnAviVhsXSUZIJllmxI/gg2xA7ZtQNINlg2WENUdshF4LBpFmEGwjLLBMsRmoBaSXIkiGM7dnDO3lgZxGByQvu5U0zMGmEw+LdPkYixvlkfHl2QTMSbnUybh5Ss1IzbqmSSSSYU7JIBJaYJZrcL6Z3sM+Ns9IxQxrKhpg2RiCwspJtw3iLgRaS8wVJp7H0fYm3RWX4qRQZ/FdSgtw534ads0cPtHDv8rqdchrlkcp8wo4tgjKDkwAOZ05WJt2SbPq7tRSNbjnz42zPSBY4+2elH4lNJJpM+rivS5jwlX9zzHiZlrmAbEXF7HUdhkKzpXT14kyz6tvzFDr06PBv90DUCjRx3m/oIsVlGtLRxNcshPOn9qRaoO31gWY85a4lSw7PGVUTncrAOsoacY3x/DKe+WxNxYZE3FgRkQYRNhcoZRkMaNQXtcXte2V7c7SphoXYSakZQ048RBlJqAJmnKmnGykqac1AEzSlCkcKShpzUYWv2SB+yHNOUNODSCwLQbLDmnKGnF0msBuzkNuGdg0msyCoMruRip08rQlFVM82yui3QqFMtny8Iy+FHA5wTb6659R9ZjOGnyDUg8fpLlDOiqp+Ze8QqUAfkqW7DNQUhc0RytOfZxzI8xHDRcarcc1zHfbSVCg6GEOhMVOEPAg+UG1FhqpjiqwhVqETA7SM6x5TotNJWBzZZVsMp+Ukdf1hB2nwZ5TlOmkRHaeyazfIobsDC/WxtlCpsDEn7lupUfWHS/Qmn+BrCe0DIoUpkOO8Se8sDNLDbUFQ2BIPIkDwOkzaXs9ivyDqb/SW/wDjeI1DIL8rgek6ITyLgbeuTWqgjMqe67ekRr4l/u0nPbut6StLYWJUZVt3PKxa3fpCnZOIOuIbu3gfWW7k3wJQia9f8DdNw/pKOa54P/aR9Js09n1Vt/8Ae5HIhG8yI5uGZRk/LZjyRfEWtZx1Q38bRZsNUzG6+ZuRusBfna1p7MpKFJngvy2KeQp06wNwKgNrXs17ctOyMHE4nLN8vyHPK2eWc9GySu7CsFeGwWYdDH1x8wYjP7rXz7bRxcYx4HvBHqI8VlCkrGLXILFvfPy8xBlm4jzEaNOUanHoWxQk/h85T3n5TGzTlDTgaZrFDVfgv+6UbE1Pw+sbNOVNOI4v2Gxb37/h85U4hx93zvGTTlCkDi/ZrFvtTfhPn+kkNuSQaZew2B3T2wboO/pnNAle2D+024eM8s9BxQnTLjmB2Z+Rh0YnLI+R/SNUqqtmBbn+0MMMjZjyyjab8CpVyZtTDryK+Y8ou1AjMEHoZq1AV6fzWK1aIY3HwnmMoKBKC4K4XFOOc0lWlVydQG/EMj3zHYMhsw7evaOBj2ErIdWAPI5eekaL4ZotPZkxezXp5q91/Np3kaRU1SPnUgcxmJ6PDvlYm4PAzP2js/c+OnmvFeK9OY7OEaUdrQaaM5ai8GjCJ2RJcHUqG6oe4HyAFz3TRo7Cxe6CEqWPMqmXP4zJpgi5Pg6Fbh/1DJtmrSyZ+mjA9hBzHdacGxcTxK5/nOXeo9JZPZZ7i7Jmc8z35kSi1cBep+Ea+x/aenUbcqbqHLdbNVY8rN8p7zPRigCLieeoezVNBZtCeOdu/wDaegwOBFNAqluhYtbszMutuTRUvuQN6EC1KOspgWWVTEkhNqcE1OOMkEyyiZJoUZIMpGykGyR0I0LFZQpGGWUKxkIxcrKlIcicKxhRY05Q040UlCkNAFSkqUjLLKFYKMLFJzchyJwrNRhfclCkaKShSCjC3upIfdkgMLDZjj5WB6grKNs+pxXwsZrb8hqzx9J6tI89Ww7U8yCB0MYwz3zByPrNkVpRlVtVB6gesZKhdIqxNs7W48pnYuuE0zvpbObLbPpMLMngzD6xWp7PUj8rsvYbEfrDK2K1Lgx/t113SpPWJrTnpKOxVTNl3+hv5ZH1jeDwuEY/NTB/Cbqem61pNidqUqto8xSp1lF037dlyPCeg9l9lValUNUVt1QW+LS/3RY6m+fQGepo4JQLIBbs0PZlNfDIFXPL+a9JPLKo7HX0/S1JNvZDlbZnwK1I2U2uh0Nxf4TwtxGnDKMUPZ8VQAKpUjUFQR3i4PnwlqWPpZDeG6oCrxyHTiY+m06X3QWbg3y27zn3Wzniz6nNHZN7HoSi62QsfYo81P8AqI8tw28YM+yarZnbesbhQLC403vxW7purtOslMM4UjTfAPD8Sg5d2XSY20NvVDoVA5gH6kyUer6ie2ojixTb8LYzNo4IZi2vdEaI3AEPDIdv6GXfEOWLFiTw0tbpa0SxWIYg6eE9jo55PF2ivUQjVvyPlYFlimzcUSdwgkm53r6gDQ34zTInrJnltCTrBFY4yzMx+0FpuqsCAwJ3st0Wtxv18pTWoq2ScbLsIJkjKMrC6kEcwRY9DxgcVUVAS53Qoub3Fh/CI0csH4aJyg15QApKGnL0sXTcXRgw5rdh320l3NsyCOoI9eo8Y/dhdWrJ6GLMsruy1XFIMyw8RBPi15jxEopIRxOkShWDG0KZNt9b8t4X5QxfO2fgbeMOtexdIIrKlRCmVIjWLQEqJQiHa0oSILMCJlDVEI1Rec4RfQW6wWagX2hOYnIF1NzkP7hJF1DaQ+7LBJC5EEa3aJ5Z6YcKJfKJNixz9YCrtCw1E2pANTfitbGgG2p6fWY1XaR5+ECtSo/yKx6At6CBz9CPIjWxG17aZecxsXiWqtcxulsSu2ZQjtYgeWscX2ce3xOo6At+kXdiSU58bG97CqhRm3ruWs35VHy+PPs7J6rFVLL/AFacraH+donzAUK2GbfViMvmU2v2MP8AuLVds1zl717Z6Eg56m+uc04KSL4+q7Uaa3PptMwyYsLqwHUgT5E2JY/MzHqxPrLJXtpOafSxn5Lw+J1wfZW9paSrYuD/AE/F56ec8ftL2uQVAaa/BncEgbx4ZC9h6zxtbGsRa+XGK3iYuhx43YmX4jJ7QVHtm9t0P+S39w/SI1/bFj8tEDq5PkAJ5laTHQGHoYB2NtL9864QjD6Uc0uqz5OfwaZ9qa17qqAg3GTH/wBp6LZPtUauRsr/AHhwP5l59JiUNh0wPizPHO3kDHKGyKQIIXMaG5/WdMYyETyJ7s9J/iDdnh+8XxlQVVKsB2HiDzGcQo0N3QsRa1ibjzhd0x2rVFUzFrYSqjXW/Vb3PeM5UbRrrrv6EZhtDa+luQzmxVLdkzcTRZtTON9MivcK0tujf94yJv2I3slYgixByz744ntAOR4cVOl/obfvnMd9lA6xB6NNW3bX7brb1k5dMhO61wbOJNNzcKyNndkKje/qW+63XI9sXxHudwBgS2eYFOlmeN1BLHre87htkXF7ADxP7Q3+CryEpHBJcgck1VfkysIqBvg3Ac7Go2lxb4RYd17zew9QgXZi7HVib37BbIDsEzMXsg2yFu7e8M/pM1qNSkcifMHvU6zoxtY3bRyzUqrg9WMRO+9mFhNpIRZ/hbnmL9eU0lccDO2ORS8EaG9+UdoE1Ytisbu6KzMdBY2Pf9IzmkrYKJisY65omXFmuPAaxBtqKfmUHx/XKAxWOr3+IsvIW3R3RKvWZjdjc88vpOOed3t+Rh37VS/AfEyTNnJPvS/gx7FaZI0v1Iv6yppNe2XeDl5Rmj7LY0/5D2/M6L6mOp7E4s6+7XrUZiP7QZwvqILlHrLHL0ZB2aGzL+FgfM/SUGxF5Bv6na/+ywm7W9jMWltxkfmAxW39xF4RPY/FH5mpJ/rqsfAC03zGPzZnhb+0yqGB3TlTpL3bx8SB6xwF+YmpT9iqls8Tb+lCf+TxlPYyl96tVbvRR/xm+ax8DLBL0YnvQNWXxAg2xKD71+k9KPZHC8feHrUYf8bQi+zODH+SD1ao3q0PzUfQ3YkeA2lWFS6W3V5m+cx2wVP/AMnl+s+o472fwu427RQXBFwo3l/MDzE+bbR2dVoOVdb8QciCOy389A8c2o582Gt2rFfsin5bnraOYfYu8L8OecEMbUuD7oHd0BF+/rDf4tWJsWC/6cvGOmuSKjD0Np7PqO3rp6xinsqkudh5azNbHPxqs/YBZe//ALlcRtJmG6LIOJ4+UdSiNUVwbBwtITqYWmDqfG8wBWA+V2PbnfzBtGTtU8F8f4IVNcmtHoAVE4+JVdfQzFoVMRUF6aEgG1xugX5ZwhwGMOqH+4D0Mp3PSFNUY5efrODGrzEx32ViOKX7w31izUGRgHQAnQaE8MuMDm/RrPRHFDnBO3f4zMpb4Pw06n/r4t+sMaOJb8Kg8zn5A+sNt8GckhLaG0LgooO9p/BEKOEI+J7KNRvHj/SM/Kab7Gq2+dc9c29f2ieH2W7kjUKbX0A6RJRlyT+p2bGz9o01UKXLnmFOnK3Kaq1gR+sSwOz6dK19e0+gjL4ymDa/GxtwPIx4uvJdRdHfeA63+kBWpKwI/WWbFX+VGPbYWlgzcV8zfwtDdm0nl9obLdSSqkjsIPkM/KCTE1rWAPXdF+l7Zz132VSbsp/uYDytLNg0Itu36lj9YFF8MjLErPJbuJbg/huj6Q2FetSBBS9zf5luPC89QMImgW3QmVfBU/w58/hPqIUpJ2mDsxPM18elRSrDdNja+l7cDMdjPZYvZqNon/GYWM2MyaBj0F/Qnzi5NUt2TeJrwZEku9OxscuuR8JJEnR+iGqShqxZqsGas+dR9TQ0asoasWNWVNWUQBk1ZQ1IuasqasqhWMF5UvFzUlTUlEAMWmF7S4MPSOXyfEp/DzH9Ns+601TUgMSbqQRcGwIOliQDfuvKpiSVo8DRwVQ/d8xHaOz3GZS/Sx8hnHxhKiqFUBxewbPibkkAHKEGDr2yqIOg3j5kD1gbm/AILHHzYKgCwsqk92UVrbEOu6BxFioz7vTTrDtg6wO6MQ3EndpkcRqQdczrynDsd8ia9Um4uBdeOfzGaOKd7NBnlhJbpv8Awy61Ag/GQo5jO/6d8awGxlezMCE4fifpyHb/ANzY/wAPp8UB/q+M+DZDwhqahRYXt2kk+JnVjx+zlnKy2HoKgsosBoo0HO3XiZZmgjUg3qTsUjnaCM8QqYdfee8t8Vt2/Zl4fuYR6sA1ePqJtBWMEzwD1xzgXqx1MRom0qh921vAC+VxfLpMvC7Q3VK5cbHvyvbjH2cxSvRVyFsCx04HrccJPIr3s0W14BJWBzJtrne58T9LzWwuEY2IG6MiSwuT3H9oXZmylpi+rcW17heaRiKPsuk+Si0rcSfIeAnTIROXlAnbzuUpecvGAWZoN3klDNYpVwZwXlwYCtWA4jnFsNBGtykmR9tbi5vc6aa5eUkGo2x9MLSu9KF5UvPmUj2bCXnCYMvKmpGQthCZwmAapKGpHQLGC0oXgC8oXjoDYc1JQ1IAvKGpKIRsOakGzCAapBtVlUxGMNUgmrQDVIB6kopCMaatAvXipqxerXjqRNodavAVMVEHxEXer2yikTaHqmJi7YmJtUgi8dSEaH/fzhqRIPONWjKQtB6tbXOa2xsGAPeHNnz6A6Ad1p56oCwRRqxJ7y24PQ+M9hSWwA7v4IYu2aK3CXkE4RaQNwjlKOWM5bKRh/Oko4HGGzUUq1AMrjlzixxYDbmZa1+AFv56RPamPFMHd10/nSC2ShAJJG82ZOptp07ourcVvejVSoTy8b/SCxGMC6kCCqqdC9r2tYE5dL9Zh16TlrBibk2+Ag+czkLJ0PV9qfh485n167Nx+ktRwjsSAwJBHDLu8JSpQqA7tgTrx+sSybbYud7mZJYqw4DxH6zsAlf2fWiZUtJJPBR7wNnlS0kkcBQtKF5JIUAoXlC8kkdAZXelS05JGQpR3gmtJJHQGUaLVGkkjJitC1SpFKjySSiJMC1SBdpJJRE2BJlS0kkZEmTenBmQBxNvGSSEBobGCtVHJAAo53ubnxJ756i/kJySXh4Gx7o4FP7y4E5JCyqOFeUytpYoC/Zketr/AFEkkzFk6R5pFarU11M9AgWmoCC5I6Z9pkkiIji8auWWXGIBZvmvawFwDrqZmYqo+833Qo55Z3OnjJJNY0t0Cwfwq5JzsCABYZcMtNLS+LxBb4UUDLPS/bnxOY8ZJJhOKKDBDX4r8bWtfjbOSSSGg6Uf/9k=",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, (err) => {
        if(err) console.log(err); 
        else console.log("removed campgrounds!");

        Comment.remove({}, (err) => {
            if(err) console.log(err);
            else console.log("removed comments!");

            // add some campgrounds
            data.forEach((seed) => {
                Campground.create(seed, (err, campground) => {
                    if(err) console.log(err);
                    else{
                        console.log("added campground");
                        // create a comment
                        Comment.create(
                            {
                                text: "This place is great but no internet.",
                                author: "Homer"
                            }, (err, comment) => {
                                if(err) console.log(err);
                                else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                                
                            }
                        );
                    } 
                });
            });




        });
        
    });
    

    // add some comments
}

module.exports = seedDB;