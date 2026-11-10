#!/usr/bin/env node
import { request } from 'undici';



function getArgValue(flag){
    const index=process.argv.indexOf(flag);
    return index!=-1 ? process.argv[index+1] :null;
}
const durationInput=getArgValue('--duration') || 'week';
const limitInput=getArgValue('--limit') || 10;
const language=getArgValue('--lang');

const validDurations=['day','week','month','year'];

if(!validDurations.includes(durationInput)){
    console.error(`Error: Invalid duration '${durationInput}'. Must be one of: day, week, month, year.`);
    process.exit(1);
}
if(isNaN(limitInput) || limitInput<=0 ){
    console.error('Error:Limit must be a positive number');
    process.exit(1);
}

function getDateString(duration) {
    const date=new Date();
    switch(duration){
        case'day':date.setDate(date.getDate()-1);
        break;
        case'week':date.setDate(date.getDate()-7);
        break;
        case'month':date.setMonth(date.getMonth()-1);
        break;
        case'day':date.setFullYear(date.getFullYear()-1);
        break;

    }
    return date.toISOString().split('T')[0];
}

async function fetchTrendingRepos() {
    console.log(`Fetching trending repositories for the past ${durationInput}...`);
    const dateStr=getDateString(durationInput);
    
    let query=`created:>${dateStr}`;
    if(language){
        query+= ` language:${language}`;
    }

  const githubUrl = new URL('https://api.github.com/search/repositories');
   githubUrl.searchParams.append('q', query);
   githubUrl.searchParams.append('sort', 'stars');
   githubUrl.searchParams.append('order', 'desc');

   

    try{
        const {statusCode,body} =await request(githubUrl.href,{
            headers:{'User-Agent' : 'NodeJS-Trending-CLI'}
        });
        
        if(statusCode!=200){
            console.error(`\nGitHub API Error (Status ${statusCode}). Please try again later.`);
            process.exit(1);
        }
        const result=await body.json();
        
        if(!result.items || result.items.length===0){
            console.log("\n No repos found for this criteria");
            return;
        }
        const formattedData = result.items.slice(0, limitInput).map(repo => ({
            Repository: repo.name,
            Stars: repo.stargazers_count,
            Language: repo.language || 'N/A',
            Description: repo.description ? repo.description.substring(0, 50) + '...' : 'No description'
        }));
        console.table(formattedData);
    }
    catch(error){
        console.error("\nNetwork Error: Failed to connect to the GitHub API.");
        console.error(error.message);
        process.exit(1);
    }

   
   
   
}
fetchTrendingRepos();

