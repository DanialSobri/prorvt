from revit_extract import RevitExtractor
rvt_path = r"pr_gardyn_home_garden_gb0001_wthBw8XVcY.rfa"
prodb = RevitExtractor(rvt_path).read_prob_data()
categories = prodb.get_all_categories()
for key in categories:
    print(key, categories[key])