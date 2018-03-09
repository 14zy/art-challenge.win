require "json"
popularEasy = [21, 15, 9, 28, 45, 54, 112, 63, 17, 30]
surrealism = [33, 14, 15, 79, 82]
impressionism = [2, 3, 9, 17, 21, 30, 36, 49, 53, 57, 60, 61, 69, 77, 84, 94, 96]
popular = [1, 4, 7, 9, 14, 15, 17, 19, 21, 22, 24, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 45, 46, 49, 50, 53, 54, 55, 57, 58, 61, 62, 63, 69, 73, 75, 77, 79, 80, 82, 83, 94, 95, 112, 118];
avantgarde = [26, 4, 40, 52, 1, 63, 83, 118, 28, 80, 82, 49, 94, 15]
#artdeco
#abstractionism
american = [83, 116, 118, 18, 60]
italian = [1, 41, 42, 43, 45, 55, 87, 95, 101, 106, 108, 112]
french = [2, 9, 17, 30, 36, 40, 49, 53, 57, 58, 61, 64, 65, 69, 70, 73, 75, 77, 93, 94, 96, 97]
russian = [3, 4, 5, 6, 8, 10, 11, 12, 13, 16, 19, 20, 23, 25, 26, 27, 37, 38, 44, 47, 48, 76, 81, 84, 85, 86, 103, 105, 113];
northernRenaissance = [24, 35, 39, 41, 42, 45, 50, 55, 87, 89, 90, 91, 92, 95, 98, 100, 101, 104, 106, 108, 110, 111, 112, 114];
popularAll = [1, 4, 7, 9, 14, 15, 17, 19, 21, 22, 24, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 45, 46, 49, 50, 53, 54, 55, 57, 58, 61, 62, 63, 69, 73, 75, 77, 79, 80, 82, 83, 94, 95, 112, 118];
#realism = [5, 8, 18, 25, 37, 47, 48, 58, 85, 113, 116, 117];
#armenian = [117, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133 ,134, 135];
all = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118]

mylang = "en" #ru #en
quest = all
questFile = "quests/#{mylang}/all.json"





## Берем всю инфу по текущему языку из CouchDB
lang = "en";
langDB = JSON.parse `curl -X GET http://178.62.133.139:5994/lang/#{lang}`

langDBMY = JSON.parse `curl -X GET http://178.62.133.139:5994/lang/#{mylang}`


startText = "{\"paintersDB\": ["
endText = "]}"


File.open("#{questFile}", 'a+') do |file|
  file.write startText
end

##Проходимся по всем художникам
quest.each do |n|

  ## Берем инфу по художнику из CouchDB
  painter = JSON.parse `curl -X GET http://178.62.133.139:5994/painters/#{n}`

  ## Обрабатываем немного
  #description =  painter["bio"][lang].sub("<p>","")[0..150].gsub(/\s\w+\s*$/, '...')

  painterName = langDBMY['painters'][painter['_id']]

  painterNations = []
  painter["nationality"].each do |nationality|
    nation = langDB['nation'][nationality];
    if nation == "Italian"
      nation = "Italy"
    end
    if nation == "Russian"
      nation = "Russia"
    end
    if nation == "Armenian"
      nation = "Armenia"
    end
    if nation == "French"
      nation = "France"
    end
    if nation == "Mexican"
      nation = "Mexico"
    end
    if nation == "Belgian"
      nation = "Belgium"
    end
    if nation == "Spanish"
      nation = "Spain"
    end
    if nation == "American"
      nation = "USA"
    end
    if nation == "Dutch"
      nation = "Netherlands"
    end
    if nation == "Austrian"
      nation = "Austria"
    end
    if nation == "Flemish"
      nation = "Netherlands"
    end
    if nation == "German"
      nation = "Germany"
    end
    if nation == "British"
      nation = "United-Kingdom"
    end
    if nation == "Jewish"
      nation = "Israel"
    end
    if nation == "Belarusian"
      nation = "Belarus"
    end
    if nation == "Czech"
      nation = "Czech-Republic"
    end
    if nation == "Greek"
      nation = "Grecee"
    end
    if nation == "Norwegian"
      nation = "Norway"
    end
    if nation == "Ukrainian"
      nation = "Urkaine"
    end
    if nation == "Swiss"
      nation = "Switzerland"
    end
    painterNations.push(nation)
  end

  painterGenres = []
  painter["genre"].each do |genre|
    painterGenres.push(langDB['genre'][genre])
  end

  # print painter["id"]
  # print painter["name"]
  # print painter["years"]
  # print painterNations
  # print description
  # print painter["paintings"].count


  data = %{ {"id": #{painter["id"]},"name": "#{painterName}", "years": "#{painter["years"]}","nationality": #{painterNations},"paintings": #{painter["paintings"].count}, "paintingsDB": #{painter["paintings"]} }, }

  File.open("#{questFile}", 'a+') do |file|
      file.write data
  end

end

File.open("#{questFile}", 'a+') do |file|
    file.write endText
end
